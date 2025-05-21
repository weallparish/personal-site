import { Interactable } from "./Interactable.js";

export class DialogInteractable extends Interactable {
    constructor(x, y, dialog) {
        super(x, y);

        this.dialog = dialog;
    }

    interact(input) {
        if (window.confirm(this.dialog)) {
            window.location = "terminal";
        }
        
    }
}