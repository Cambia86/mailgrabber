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
  FlagPrivacy: number



  constructor(mail: string, flagPrivacy: number) {
    this.Mail = mail
    this.FlagPrivacy = flagPrivacy
  }
}

@Component({
  selector: "my-app",
  templateUrl: "app.component.html"
})



export class AppComponent implements OnInit {
  private database: any;
  public pictureArr
  public showSlide = false
  public picSlideTimer
  public myImageSource = "~/images/boxeur-des-rues.jpg"
  public generalTimer
  public showactionbar: boolean = false
  public userMail: string
  public people: Array<any>;
  public validMail: boolean = true
  @ViewChild("CB1") FirstCheckBox: ElementRef;
  public showPrivacyPol:boolean=false
  public tvtext:string=''

  constructor(
    private page: Page,
    private vcRef: ViewContainerRef,
    private modal: ModalDialogService) {
    page.actionBarHidden = true;

    this.people = [];
    (new Sqlite("my.maildb")).then(db => {
      db.execSQL("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, mail TEXT, flagPrivacy INTEGER)").then(id => {
        this.database = db;
      }, error => {
        console.log("CREATE TABLE ERROR", error);
      });
    }, error => {
      console.log("OPEN DB ERROR", error);
    });
  }

  initializePicture() {
    this.pictureArr = {
      current: 2,
      lst: [
        { url: "~/images/boxeur-des-rues.jpg" },
        { url: "~/images/boxeurwhite.jpg" },
        { url: "~/images/whoweare.jpg" }

      ]
    }
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


  onDoubleTap(args: GestureEventData) {
    this.showModalGender()
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



  onChangeMail(event) {
    if (this.validateEmail(this.userMail))
      this.validMail = true
    else
      this.validMail = false
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  showconfirmmodal() {
    let options = {
      context: {},
      fullscreen: false,
      viewContainerRef: this.vcRef
    };
    this.modal.showModal(confirmmodal, options).then(res => {
      let resp = res;
      this.userMail = ''
    });
  }

  onTap(args: EventData) {
    this.FirstCheckBox.nativeElement.checked
    if (this.FirstCheckBox.nativeElement.checked == true) {
      this.resetAllTimer()
      if (this.validateEmail(this.userMail)) {
        this.insert(new userRegistration(this.userMail, 1))
        this.validMail = true
        this.showconfirmmodal()
      }
      else
        this.validMail = false
    }
    
  }


  public fetch() {
    this.database.all("SELECT * FROM people").then(rows => {
      this.people = [];
      for (var row in rows) {
        this.people.push({
          "mail": rows[row][1],
          "flagPrivacy": rows[row][2]
        });
      }
    }, error => {
      console.log("SELECT ERROR", error);
    });
  }

  public insert(usr: userRegistration) {
    this.database.execSQL("INSERT INTO people (mail, flagPrivacy) VALUES (?, ?)", [usr.Mail, usr.FlagPrivacy]).then(id => {
      console.log("INSERT RESULT", id);
      this.fetch();
    }, error => {
      console.log("INSERT ERROR", error);
    });
  }

  readPrivacy(){
    this.showPrivacyPol=true
    this.tvtext="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quam nulla, commodo eget gravida sed, tristique sed ante. Mauris auctor, lorem id tincidunt tempor, velit nunc pharetra dolor, at ullamcorper nisl erat in eros. Sed tincidunt elit ac augue ultrices, aliquet pretium orci cursus. Aliquam semper sagittis magna sit amet semper. Etiam ligula odio, convallis non rutrum nec, finibus ut ex. Vestibulum pellentesque aliquet justo, id maximus justo pulvinar non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur posuere nec odio eu porttitor. Pellentesque tellus nulla, condimentum quis arcu ut, venenatis elementum nunc. Morbi condimentum ac lectus et condimentum. Phasellus in dictum nibh. Curabitur sed lobortis velit. Cras hendrerit eros in erat feugiat, id aliquet enim gravida."
  }
  back(){
    this.showPrivacyPol=false
    this.tvtext=''
  }

  onFocusMail() {
    clearTimeout(this.picSlideTimer);
    clearTimeout(this.generalTimer);
  }

  onBlurMail() {
    this.resetAllTimer()
  }

  hideSlider() {
    this.showSlide = false
    this.resetAllTimer()
  }

  nextPict() {
    this.pictureArr.current = this.pictureArr.current + 1
    if (this.pictureArr.current == 3) {
      this.pictureArr.current = 0
    }
    this.myImageSource = this.pictureArr.lst[this.pictureArr.current].url
    this.timeout();
  }

  resetAllTimer() {
    clearTimeout(this.picSlideTimer);
    clearTimeout(this.generalTimer);
    this.openSliderTimed(30000)
  }

  timeout() {
    this.picSlideTimer = setTimeout(() => {
      this.nextPict()
    }, 5000);
  }

  showSlider() {
    this.page.actionBarHidden = true;
    this.showactionbar = false
    if (!this.showSlide)
      this.timeout()
    this.showSlide = true

  }

  openSliderTimed(time) {
    if (this.showSlide === false)
      this.generalTimer = setTimeout(() => {
        this.showSlider()
      }, time);
  }

  ngOnInit() {
    this.initializePicture()
    this.openSliderTimed(100000)
  }
}
