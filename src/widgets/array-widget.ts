import { create, DOMNode } from "duct-tape";
import { SchemaElementArray, SchemaElementObject } from "~/editor";
import { ObjectWidget } from "./object-widget";

export class ArrayWidget extends DOMNode<"div"> {
    private _schema: SchemaElementArray;
    private _data: any[];
    private _itemsContainer: DOMNode<"div">;

    constructor(key: string, schema: SchemaElementArray, data: any[]) {
        super("div");

        this._schema = schema;
        this._data = data;
        this.class("array-component");

        this.append(
            this._itemsContainer = create("div", this)
                .class("items-container")
        );

        this.build();
    }

    build(): void {
        if (this._schema.item === undefined) {
            return;
        }

        this._data.forEach((data, index) => {
            const item = create("div").class("array-item");
            this._itemsContainer.append(item);

            if (this._schema.item.type === "object") {
                item.append(new ObjectWidget(`Element #${index + 1}`, this._schema.item as SchemaElementObject, data));
            } else {
                console.warn(`Unsupported array item type: ${this._schema.item.type}`);
            }
        });
    }
}