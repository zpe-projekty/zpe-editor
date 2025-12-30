import { Disposable, DOMNode } from "duct-tape";
import { ObjectWidget } from "./widgets/object-widget";
import { ExerciseEditorApi } from "./main";

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
    private _api: ExerciseEditorApi;
    private _types: Record<string, any> = {};

    constructor(container: HTMLElement, api: ExerciseEditorApi) {
        super();
        this._container = container;
        this._api = api;

        console.log("Editor created");
    }

    get api(): ExerciseEditorApi {
        return this._api;
    }

    saveState(): void {
        this._api.triggerStateSave();
    }

    async run(data: Data): Promise<void> {
        this._data = data;

        return new Promise((resolve) => {
            console.log("Editor running...");
            fetch(this._api.enginePath("schema.json")).then(async (response) => {
                const schema = await response.json() as Schema;
                console.log("Schema loaded:", schema);

                const propertiesSchema: SchemaElementObject = { type: "object", properties: schema.properties };

                if (schema.definitions) {
                    this._types = schema.definitions;
                    this.replaceDefinitions(propertiesSchema);
                }

                this.register(
                    new ObjectWidget(this, "Root", propertiesSchema, this._data).mount(this._container)
                );

                resolve();
            }).catch((error) => {
                console.error("Error loading schema:", error);
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