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
            providers: [],
            schemas: [core_1.NO_ERRORS_SCHEMA],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLG9EQUFxRTtBQUNyRSxpREFBK0M7QUFDL0Msa0ZBQW9FO0FBQ3BFLDhFQUFxRTtBQUNyRSx5REFBa0U7QUFDbEUsNkNBQWlEO0FBQ2pELHdEQUFtRDtBQUNuRCxpRUFBNEQ7QUFDNUQsaUZBQWlGO0FBWWpGO0lBQUE7SUFBd0IsQ0FBQztJQUFaLFNBQVM7UUFSckIsZUFBUSxDQUFDO1lBQ1IsWUFBWSxFQUFFLENBQUMsNEJBQVksRUFBQyxpQ0FBVSxFQUFDLGdDQUFZLEVBQUMsOEJBQWEsRUFBQyxvQ0FBZ0IsQ0FBQztZQUNuRixlQUFlLEVBQUMsQ0FBQyxpQ0FBVSxFQUFDLGdDQUFZLENBQUM7WUFDekMsU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztZQUN6QixPQUFPLEVBQUUsQ0FBQyx3Q0FBa0IsRUFBQyw4QkFBZ0IsRUFBQywrQkFBdUIsRUFBQywyQkFBaUIsQ0FBQztZQUN4RixTQUFTLEVBQUUsRUFBRTtZQUNiLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1NBQzVCLENBQUM7T0FDVyxTQUFTLENBQUc7SUFBRCxnQkFBQztDQUFBLEFBQXpCLElBQXlCO0FBQVosOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcbmltcG9ydCB7YWRtaW1tb2RhbH0gZnJvbSBcIi4vc2hhcmVkL21vZGFsL2FkbWluL2FkbWlubW9kYWwuY29tcG9uZW50XCJcbmltcG9ydCB7Y29uZmlybW1vZGFsfSBmcm9tIFwiLi9zaGFyZWQvbW9kYWwvY29uZmlybS9jb25maXJtLmNvbXBvbmVudFwiXG5pbXBvcnQgeyBUTlNDaGVja0JveE1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1jaGVja2JveC9hbmd1bGFyJztcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hcHAucm91dGluZ1wiO1xuaW1wb3J0IHtIb21lQ29tcG9uZW50fSBmcm9tIFwiLi9ob21lL2hvbWUuY29tcG9uZW50XCJcbmltcG9ydCB7UHJpdmFjeUNvbXBvbmVudH0gZnJvbSBcIi4vcHJpdmFjeS9wcml2YWN5LmNvbXBvbmVudFwiXG4vLyBpbXBvcnQgeyBGaXJzdENvbXBvbmVudCwgU2Vjb25kQ29tcG9uZW50IH0gZnJvbSBcIi4vcHJpdmFjeS9wcml2YWN5LmNvbXBvbmVudFwiO1xuXG5cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbQXBwQ29tcG9uZW50LGFkbWltbW9kYWwsY29uZmlybW1vZGFsLEhvbWVDb21wb25lbnQsUHJpdmFjeUNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czpbYWRtaW1tb2RhbCxjb25maXJtbW9kYWxdLFxuICBib290c3RyYXA6IFtBcHBDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbTmF0aXZlU2NyaXB0TW9kdWxlLEFwcFJvdXRpbmdNb2R1bGUsTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsVE5TQ2hlY2tCb3hNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtdLFxuICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV0sXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7fVxuIl19