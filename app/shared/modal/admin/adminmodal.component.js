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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW5tb2RhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZG1pbm1vZGFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQyxtRUFBNEU7QUFPNUU7SUFHSSxvQkFDWSxNQUF5QjtRQUF6QixXQUFNLEdBQU4sTUFBTSxDQUFtQjtJQUdyQyxDQUFDO0lBRUQsMEJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUE7UUFFckIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxXQUFXLENBQUM7WUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsSUFBSTtZQUNBLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFJTSwwQkFBSyxHQUFaLFVBQWEsR0FBVztRQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBdEJRLFVBQVU7UUFMdEIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsWUFBWTtZQUN0QixXQUFXLEVBQUUsNkJBQTZCO1NBQzdDLENBQUM7eUNBS3NCLDJCQUFpQjtPQUo1QixVQUFVLENBdUJ0QjtJQUFELGlCQUFDO0NBQUEsQUF2QkQsSUF1QkM7QUF2QlksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6IFwiYWRtaW5tb2RhbFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vYWRtaW5tb2RhbC5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIGFkbWltbW9kYWwge1xuICAgIHB1YmxpYyBQYXNzd29yZFxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtc1xuICAgICkge1xuXG4gICAgfVxuXG4gICAgb25UYXAoKSB7XG4gICAgICAgIGxldCBwID0gdGhpcy5QYXNzd29yZFxuXG4gICAgICAgIGlmICh0aGlzLlBhc3N3b3JkID09PSBcIkJveGV1cjEyM1wiKVxuICAgICAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayh0cnVlKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayhmYWxzZSk7XG4gICAgfVxuXG5cblxuICAgIHB1YmxpYyBjbG9zZShyZXM6IHN0cmluZykge1xuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHRydWUpO1xuICAgIH1cbn0iXX0=