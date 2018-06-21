"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var admimmodal = /** @class */ (function () {
    function admimmodal(params) {
        this.params = params;
    }
    admimmodal.prototype.onTap = function () {
        var p = this.Password;
        if (this.Password === "Boxeur123")
            this.params.closeCallback(true);
        else
            this.params.closeCallback(false);
    };
    admimmodal.prototype.close = function (res) {
        this.params.closeCallback(true);
    };
    admimmodal = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "adminmodal",
            templateUrl: "./adminmodal.component.html"
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams])
    ], admimmodal);
    return admimmodal;
}());
exports.admimmodal = admimmodal;
