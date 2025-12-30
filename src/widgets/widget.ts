import { DOMNode } from "duct-tape";
import { Editor } from "~/editor";

export abstract class Widget extends DOMNode<"div"> {
    protected _editor: Editor;

    constructor(editor: Editor) {
        super("div");

        this._editor = editor;
    }
}