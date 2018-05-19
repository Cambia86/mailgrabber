
import { NgModule } from "@angular/core";

import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import {HomeComponent} from "./home/home.component"
import { PrivacyComponent } from "~/privacy/privacy.component";

export const routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
     { path: "privacy", component: PrivacyComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }