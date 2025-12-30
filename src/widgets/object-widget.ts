import { create, DOMNode, ValueStore } from "duct-tape";
import { Editor, SchemaElementObject } from "~/editor";
import { NumberWidget } from "./number-widget";
import { ArrayWidget } from "./array-widget";
import { StringWidget } from "./string-widget";
import { BooleanWidget } from "./boolean-widget";
import { RefWidget } from "./ref-widget";
import { Widget } from "./widget";

export class ObjectWidget extends Widget {
    private _schema: SchemaElementObject;
    private _data: Record<string, any>;
    private _title: DOMNode<"a">;
    private _content: DOMNode<"div">;
    private _active: ValueStore<boolean> = new ValueStore<boolean>(false);

    constructor(editor: Editor, key: string, schema: SchemaElementObject, data: Record<string, any>) {
        super(editor);

        this._schema = schema;
        this._data = data;
        this.class("object-component");

        this.append(
            this._title = create("a", this)
                .class("title")
                .class("active", this._active)
                // .text(this._data.label || key)
                .on("click", () => {
                    this._active.set(!this._active.get());
                })
                .append(
                    create("i", this)
                        .class("dropdown")
                        .class("icon"),
                    create("h3", this)
                        .text(this._schema.label || key)
                ),
            this._content = create("div", this)
                .class("content")
                .class("active", this._active)
        )

        this.build();
    }

    build(): void {
        for (const [key, prop] of Object.entries(this._schema.properties)) {
            if (this._data[key] === undefined && prop.type !== "ref") {
                console.warn(`Data for key '${key}' is undefined.`);
                continue;
            }

            if (prop.private === true) {
                continue;
            }

            if (prop.type === "string") {
                this.register(new StringWidget(this._editor, key, prop, this._data).mount(this._content));
            } else if (prop.type === "number") {
                this.register(new NumberWidget(this._editor, key, prop, this._data).mount(this._content));
            } else if (prop.type === "boolean") {
                this.register(new BooleanWidget(this._editor, key, prop, this._data).mount(this._content));
            } else if (prop.type === "object") {
                const dataObj = this._data[key] || null;
                if (dataObj !== null && typeof dataObj === "object") {
                    this.register(new ObjectWidget(this._editor, key, prop, dataObj).mount(this._content));
                }
            } else if (prop.type === "array") {
                this.register(new ArrayWidget(this._editor, key, prop, this._data[key] || []).mount(this._content));
            } else if (prop.type === "ref") {
                this.register(new RefWidget(this._editor, key, prop, this._data).mount(this._content));
            }
        }
    }
}