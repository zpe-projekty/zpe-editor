import { DOMNode } from "duct-tape";
import { SchemaElementRef, SchemaElementString } from "~/editor";

const cache: Map<string, object> = new Map();

export class RefWidget extends DOMNode<"div"> {
    private _schema: SchemaElementRef;
    private _data: Record<string, any>;
    private _ref: DOMNode<"div">;

    constructor(key: string, schema: SchemaElementRef, data: Record<string, any>) {
        super("div");

        this._schema = schema;
        this._data = data;
        this.class("string-component");

        const label = this._schema.label || key;
        this._ref = new DOMNode<"div">("div")
            .style("display", "block")
            .style("marginBottom", "8px")

        const labelNode = new DOMNode<"label">("label")
            .text(label)
            .style("display", "block")
            .style("marginBottom", "4px");

        this.append(labelNode);
        this.append(this._ref);

        this.build();

    }

    async getFileData(path: string): Promise<object> {
        return new Promise((resolve, reject) => {
            if (cache.has(path)) {
                resolve(cache.get(path)!);
                return;
            }

            fetch(path).then(async (response) => {
                if (!response.ok) {
                    reject(new Error(`Failed to fetch file: ${path}`));
                    return;
                }
                const data = await response.json();
                cache.set(path, data);
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    async build(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const rawPath = this._schema.path;

                const tokens = rawPath.match(/\${(.*?)}/g) || [];
                const path = tokens.reduce((acc, token) => {
                    const key = token.slice(2, -1);
                    const value = this._data[key] || "";
                    return acc.replace(token, value);
                }, rawPath);

                const fileData = await this.getFileData(path.split("#")[0]);
                const pointer = path.split("#")[1];
                const segments = pointer.split("/").filter(seg => seg.length > 0);
                let value: any = fileData;

                for (let segment of segments) {
                    if (segment.startsWith("[") && segment.endsWith("]")) {
                        if (!Array.isArray(value)) {
                            value = undefined;
                            console.warn(`Expected array but found non-array at segment: ${segment}`);
                            break;
                        }

                        segment = segment.slice(1, -1); // Remove [ and ]

                        if (segment.startsWith("{") && segment.endsWith("}")) {
                            // Array access by property
                            const conditionStr = segment.slice(1, -1); // Remove { and }
                            const conditions = conditionStr.split(",").map(s => s.trim());
                            const conditionsTokens = conditions.map(cond => {
                                const [propKey, propValueTemplate] = cond.split(":");
                                const propValueTokens = propValueTemplate.match(/\${(.*?)}/g) || [];
                                const propValue = propValueTokens.reduce((acc, token) => {
                                    const key = token.slice(2, -1);
                                    const value = this._data[key] || "";
                                    return acc.replace(token, value);
                                }, propValueTemplate);
                                return { propKey, propValue };
                            });

                            let foundItem: any = undefined;
                            for (const item of value) {
                                let allMatch = true;
                                for (const { propKey, propValue } of conditionsTokens) {
                                    if (item[propKey] != propValue) {
                                        allMatch = false;
                                        break;
                                    }
                                }
                                if (allMatch) {
                                    foundItem = item;
                                    break;
                                }
                            }

                            if (foundItem !== undefined) {
                                value = foundItem;
                            } else {
                                value = undefined;
                                console.warn(`Array access by properties not found for segment: ${segment}`);
                                break;
                            }
                        } else {
                            // Array access by index
                            const index = parseInt(segment, 10);
                            if (isNaN(index) || index < 0 || index >= value.length) {
                                value = undefined;
                                console.warn(`Invalid array index access at segment: ${segment}`);
                                break;
                            }
                            value = value[index];
                        }
                    } else {
                        if (value.hasOwnProperty(segment)) {
                            value = value[segment];
                        } else {
                            value = undefined;
                            console.warn(`Property '${segment}' not found in object.`);
                            break;
                        }
                    }
                }

                this._ref
                    .text(value || "")

                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }
}