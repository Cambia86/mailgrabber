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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maXJtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQyxtRUFBNEU7QUFPNUU7SUFHSSxzQkFDWSxNQUF5QjtRQUF6QixXQUFNLEdBQU4sTUFBTSxDQUFtQjtJQUdyQyxDQUFDO0lBRUQsNEJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUE7UUFFckIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxXQUFXLENBQUM7WUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsSUFBSTtZQUNBLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFJTSw0QkFBSyxHQUFaLFVBQWEsR0FBVztRQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBdEJRLFlBQVk7UUFMeEIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsY0FBYztZQUN4QixXQUFXLEVBQUUsMEJBQTBCO1NBQzFDLENBQUM7eUNBS3NCLDJCQUFpQjtPQUo1QixZQUFZLENBdUJ4QjtJQUFELG1CQUFDO0NBQUEsQUF2QkQsSUF1QkM7QUF2Qlksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6IFwiY29uZmlybW1vZGFsXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9jb25maXJtLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgY29uZmlybW1vZGFsIHtcbiAgICBwdWJsaWMgUGFzc3dvcmRcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXNcbiAgICApIHtcblxuICAgIH1cblxuICAgIG9uVGFwKCkge1xuICAgICAgICBsZXQgcCA9IHRoaXMuUGFzc3dvcmRcblxuICAgICAgICBpZiAodGhpcy5QYXNzd29yZCA9PT0gXCJCb3hldXIxMjNcIilcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2sodHJ1ZSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soZmFsc2UpO1xuICAgIH1cblxuXG5cbiAgICBwdWJsaWMgY2xvc2UocmVzOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayh0cnVlKTtcbiAgICB9XG59Il19