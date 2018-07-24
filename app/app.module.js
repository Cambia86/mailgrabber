"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var forms_1 = require("nativescript-angular/forms");
var app_component_1 = require("./app.component");
var adminmodal_component_1 = require("./shared/modal/admin/adminmodal.component");
var confirm_component_1 = require("./shared/modal/confirm/confirm.component");
var angular_1 = require("nativescript-checkbox/angular");
var app_routing_1 = require("./app.routing");
var home_component_1 = require("./home/home.component");
var privacy_component_1 = require("./privacy/privacy.component");
var mailgrabber_service_1 = require("~/services/mailgrabber.service");
// import { FirstComponent, SecondComponent } from "./privacy/privacy.component";
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent, adminmodal_component_1.admimmodal, confirm_component_1.confirmmodal, home_component_1.HomeComponent, privacy_component_1.PrivacyComponent],
            entryComponents: [adminmodal_component_1.admimmodal, confirm_component_1.confirmmodal],
            bootstrap: [app_component_1.AppComponent],
            imports: [nativescript_module_1.NativeScriptModule, app_routing_1.AppRoutingModule, forms_1.NativeScriptFormsModule, angular_1.TNSCheckBoxModule],
            providers: [mailgrabber_service_1.mailgrabberService],
            schemas: [core_1.NO_ERRORS_SCHEMA],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
