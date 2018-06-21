import { Component, OnInit,NgModule, ViewContainerRef, ViewChild, ElementRef } from "@angular/core";
import {
  GestureEventData,
  PanGestureEventData,
  PinchGestureEventData,
  RotationGestureEventData,
  SwipeGestureEventData,
  TouchGestureEventData
} from "ui/gestures";
import { Page } from "ui/page";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { admimmodal } from './shared/modal/admin/adminmodal.component'
import { EventData } from "data/observable";
import { Button } from "ui/button";
var Sqlite = require("nativescript-sqlite");
// import { formArrayNameProvider } from "@angular/forms";
import * as fs from "file-system"
import * as permissions from "nativescript-permissions";
import { confirmmodal } from "~/shared/modal/confirm/confirm.component";
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
import { routes } from "./app.routing";
// import { FirstComponent, SecondComponent } from "./privacy/privacy.component";


declare var android: any;
export class userRegistration {
  Mail: string;
  // FlagPrivacy: number



  constructor(mail: string, flagPrivacy: number) {
    this.Mail = mail
    // this.FlagPrivacy = flagPrivacy
  }
}

@Component({
  selector: "my-app",
  templateUrl: "app.component.html"
})



export class AppComponent implements OnInit {
  private database: any;
  public people: Array<any>;
  public showactionbar: boolean = false
  

  constructor(
    private page: Page,
    private vcRef: ViewContainerRef,
    private modal: ModalDialogService) {
    page.actionBarHidden = true;

    this.people = [];

  }

  
 export() {
    let that = this
    permissions.requestPermission([
      "android.permission.INTERNET",
      "android.permission.READ_EXTERNAL_STORAGE",
      "android.permission.WRITE_EXTERNAL_STORAGE",
    ], "I need these permissions")
      .then(function (res) {
        console.log("Permissions granted!");
        var file: fs.File;
        var fileName = "robots.txt";
        var androidDownloadsPath = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).toString();
        var customFolderPath = fs.path.join(androidDownloadsPath, "customFolder");

        var folder = fs.Folder.fromPath(customFolderPath);
        var path = fs.path.join(customFolderPath, fileName);
        var exists = fs.File.exists(path);

        file = fs.File.fromPath(path);

        let filestring = ''
        that.database.all("SELECT * FROM people").then(rows => {
          that.people = [];
          for (var row in rows) {
            filestring = filestring + "mail: " + rows[row][1] + " privacy:" + rows[row][2] + '\n'

          }

          file.writeText(filestring)
            .then(result => {
              console.log(result);
              file.readText()
                .then(res => {
                  let successMessage = "Successfully saved in " + file.path;
                  let writtenContent = res;
                  let isItemVisible = true;
                  console.log(successMessage);
                });
            }).catch(err => {
              console.log(err);
            });
        }, error => {
          console.log("SELECT ERROR", error);
        });



      })
      .catch(function () {

        this.exportfile()
        console.log("No permissions - plan B time!");
      });
  }


  public showModalGender() {
    let options = {
      context: {},
      fullscreen: false,
      viewContainerRef: this.vcRef
    };
    this.modal.showModal(admimmodal, options).then(res => {
      let resp = res;
      if (res) {
        this.export()
      }
    });
  }

  onSwipe(args: SwipeGestureEventData) {

    if (args.direction > 0) {
      this.page.actionBarHidden = false;
      this.showactionbar = true
    }
  }

  onDoubleTap(args: GestureEventData) {
    this.showModalGender()
  }

  ngOnInit() {
   
  }
}
