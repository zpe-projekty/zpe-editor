import { Disposable, DOMNode } from "duct-tape";
import { ObjectWidget } from "./widgets/object-widget";

export interface Schema {
    definitions: Record<string, any>;
    properties: Record<string, any>;
}

export type SchemaElement =
    | SchemaElementObject
    | SchemaElementArray
    | SchemaElementString
    | SchemaElementNumber
    | SchemaElementBoolean
    | SchemaElementRef
    ;

export interface SchemaElementBase {
    private?: boolean;
    label?: string;
    help?: string;
}

export interface SchemaElementString extends SchemaElementBase {
    type: "string";
    enum?: Record<string, string>;
}

export interface SchemaElementNumber extends SchemaElementBase {
    type: "number";
    format?: "integer" | "float" | "number";
    min?: number;
    max?: number;
}

export interface SchemaElementBoolean extends SchemaElementBase {
    type: "boolean";
}

export interface SchemaElementRef extends SchemaElementBase {
    type: "ref";
    path: string;
}

export interface SchemaElementObject extends SchemaElementBase {
    type: "object";
    properties: Record<string, SchemaElement>;
}

export interface SchemaElementArray extends SchemaElementBase {
    type: "array";
    item: SchemaElement;
}

type Data = Record<string, any>;

export class Editor extends Disposable {
    private _container: HTMLElement;
    private _data: Data = {};
    private _types: Record<string, any> = {};

    constructor(container: HTMLElement) {
        super();
        this._container = container;

        console.log("Editor created");
    }

    async run(data: Data): Promise<void> {
        this._data = data;

        return new Promise((resolve) => {
            console.log("Editor running...");
            fetch("schema.json").then(async (response) => {
                const schema = await response.json() as Schema;
                console.log("Schema loaded:", schema);

                const propertiesSchema: SchemaElementObject = { type: "object", properties: schema.properties };

                if (schema.definitions) {
                    this._types = schema.definitions;
                    this.replaceDefinitions(propertiesSchema);
                }

                new ObjectWidget("Root", propertiesSchema, this._data).mount(this._container);

                resolve();
            });
        });
    }

    replaceDefinitions(schema: SchemaElementObject): void {
        for (const [key, prop] of Object.entries(schema.properties)) {
            if (prop.type === "string" && prop.enum && typeof prop.enum === "string" && this._types[prop.enum]) {
                schema.properties[key] = {
                    ...prop,
                    enum: this._types[prop.enum]
                };
            } else if (prop.type === "object") {
                this.replaceDefinitions(prop as SchemaElementObject);
            } else if (prop.type === "array") {
                const item = (prop as SchemaElementArray).item;
                if (item.type === "object") {
                    this.replaceDefinitions(item as SchemaElementObject);
                }
            }
        }
    }
}