import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";

@Component({
    moduleId: module.id,
    selector: "confirmmodal",
    templateUrl: "./confirm.component.html"
})
export class confirmmodal {
    public Password

    constructor(
        private params: ModalDialogParams
    ) {

    }

    onTap() {
        let p = this.Password

        if (this.Password === "Boxeur123")
            this.params.closeCallback(true);
        else
            this.params.closeCallback(false);
    }



    public close(res: string) {
        this.params.closeCallback(true);
    }
}