import { create, DOMNode } from "duct-tape";
import { SchemaElementString } from "~/editor";

export class StringWidget extends DOMNode<"div"> {
    private _schema: SchemaElementString;
    private _data: Record<string, any>;
    private _input: DOMNode<"input"> | DOMNode<"select">;

    constructor(key: string, schema: SchemaElementString, data: Record<string, any>) {
        super("div");

        this._schema = schema;
        this._data = data;
        this.class("string-component");

        const label = schema.label || key;

        if (schema.enum) {
            this._input = create("select", this)
                .style("display", "block")
                .style("marginBottom", "8px")
                .on("change", () => {
                    this._data[key] = this._input.property("value");
                });

            for (const [enumKey, enumLabel] of Object.entries(schema.enum)) {
                const option = create("option", this._input)
                    .attr("value", enumKey)
                    .text(enumLabel);
                if (this._data[key] === enumKey) {
                    option.attr("selected", "selected");
                }
                this._input.append(option);
            }
        } else {

            this._input = create("input", this)
                .attr("type", "text")
                .style("display", "block")
                .style("marginBottom", "8px")
                .property("value", this._data[key] || "")
                .on("change", () => {
                    this._data[key] = this._input.property("value");
                });
        }

        const labelNode = create("label", this)
            .text(label)
            .style("display", "block")
            .style("marginBottom", "4px");

        this.append(labelNode);
        this.append(this._input);
    }
}