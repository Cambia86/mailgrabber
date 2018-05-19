import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AppComponent } from "./app.component";
import {admimmodal} from "./shared/modal/admin/adminmodal.component"
import {confirmmodal} from "./shared/modal/confirm/confirm.component"
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';
import { AppRoutingModule } from "./app.routing";
import {HomeComponent} from "./home/home.component"
import {PrivacyComponent} from "./privacy/privacy.component"
// import { FirstComponent, SecondComponent } from "./privacy/privacy.component";



@NgModule({
  declarations: [AppComponent,admimmodal,confirmmodal,HomeComponent,PrivacyComponent],
  entryComponents:[admimmodal,confirmmodal],
  bootstrap: [AppComponent],
  imports: [NativeScriptModule,AppRoutingModule,NativeScriptFormsModule,TNSCheckBoxModule],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
