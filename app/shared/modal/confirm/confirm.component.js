"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var confirmmodal = /** @class */ (function () {
    function confirmmodal(params) {
        this.params = params;
    }
    confirmmodal.prototype.onTap = function () {
        var p = this.Password;
        if (this.Password === "Boxeur123")
            this.params.closeCallback(true);
        else
            this.params.closeCallback(false);
    };
    confirmmodal.prototype.close = function (res) {
        this.params.closeCallback(true);
    };
    confirmmodal = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "confirmmodal",
            templateUrl: "./confirm.component.html"
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams])
    ], confirmmodal);
    return confirmmodal;
}());
exports.confirmmodal = confirmmodal;
