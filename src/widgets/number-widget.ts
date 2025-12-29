import { DOMNode } from "duct-tape";
import { SchemaElementNumber } from "~/editor";

enum NumberFormat {
    Integer = "integer",
    Float = "float",
    Number = "number"
}

export class NumberWidget extends DOMNode<"div"> {
    private _schema: SchemaElementNumber;
    private _format: NumberFormat = NumberFormat.Number;
    private _min: number = -Infinity;
    private _max: number = Infinity;
    private _data: Record<string, any>;
    private _input: DOMNode<"input">;
    private _messageNode: DOMNode<"div">;

    constructor(key: string, schema: SchemaElementNumber, data: Record<string, any>) {
        super("div");

        this._schema = schema;
        this._data = data;
        this.class("number-component");

        if (schema.format === "integer") {
            this._format = NumberFormat.Integer;
        } else if (schema.format === "float") {
            this._format = NumberFormat.Float;
        } else {
            this._format = NumberFormat.Number;
        }

        this._min = schema.min !== undefined ? schema.min : -Infinity;
        this._max = schema.max !== undefined ? schema.max : Infinity;

        const label = schema.label || key;
        this._input = new DOMNode<"input">("input")
            .attr("type", "number")
            .style("display", "block")
            .style("marginBottom", "8px")
            .property("value", this._data[key] || 0)
            .on("change", () => {
                const value = this._input.property("value");

                if (value === undefined || value === "") {
                    this._messageNode.text("Wartość nie może być pusta.");
                    return;
                }

                let numValue: number;
                if (this._format === NumberFormat.Integer) {
                    numValue = parseInt(value || "0", 10);
                } else {
                    numValue = parseFloat(value || "0");
                }

                if (isNaN(numValue)) {
                    this._messageNode.text("Wartość musi być liczbą.");
                    return;
                } else if (this._format === NumberFormat.Integer && !Number.isInteger(numValue)) {
                    this._messageNode.text("Wartość musi być liczbą całkowitą.");
                    return;
                } else if (numValue < this._min) {
                    this._messageNode.text(`Wartość musi być większa lub równa ${this._min}.`);
                    return;
                } else if (numValue > this._max) {
                    this._messageNode.text(`Wartość musi być mniejsza lub równa ${this._max}.`);
                    return;
                } else {
                    this._messageNode.text("");
                }

                this._data[key] = value;
                // this._input.element.value = value;
            });

        const labelNode = new DOMNode<"label">("label")
            .text(label)
            .style("display", "block")
            .style("marginBottom", "4px");

        this._messageNode = new DOMNode<"div">("div")
            .class("message")
            .style("color", "red")
            .style("fontSize", "12px")
            .style("marginBottom", "8px");

        this.append(labelNode, this._input, this._messageNode);
    }
}