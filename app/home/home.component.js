"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var adminmodal_component_1 = require("../shared/modal/admin/adminmodal.component");
var confirm_component_1 = require("~/shared/modal/confirm/confirm.component");
var router_1 = require("@angular/router");
var Sqlite = require("nativescript-sqlite");
// import { formArrayNameProvider } from "@angular/forms";
var fs = require("file-system");
var permissions = require("nativescript-permissions");
var mailgrabber_service_1 = require("~/services/mailgrabber.service");
var app = require("application");
var userRegistration = /** @class */ (function () {
    function userRegistration(mail, flagPrivacy) {
        this.Mail = mail;
        this.FlagPrivacy = flagPrivacy;
    }
    return userRegistration;
}());
exports.userRegistration = userRegistration;
var HomeComponent = /** @class */ (function () {
    function HomeComponent(page, vcRef, modal, router, mailGrabberService) {
        var _this = this;
        this.page = page;
        this.vcRef = vcRef;
        this.modal = modal;
        this.router = router;
        this.mailGrabberService = mailGrabberService;
        this.showSlide = false;
        this.myImageSource = "~/images/IMG_1_MALLOY_1200x600px.jpg";
        this.showactionbar = false;
        this.validMail = true;
        this.showPrivacyPol = false;
        this.tvtext = '';
        page.actionBarHidden = true;
        if (app.android) {
            var activity = app.android.startActivity;
            var win = activity.getWindow();
            win.addFlags(android.view.WindowManager.LayoutParams.FLAG_FULLSCREEN);
        }
        this.people = [];
        (new Sqlite("my.maildb")).then(function (db) {
            db.execSQL("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, mail TEXT, flagPrivacy INTEGER)").then(function (id) {
                _this.database = db;
            }, function (error) {
                console.log("CREATE TABLE ERROR", error);
            });
        }, function (error) {
            console.log("OPEN DB ERROR", error);
        });
    }
    HomeComponent.prototype.initializePicture = function () {
        // this.pictureArr = {
        //   current: 0,
        //   lst: [
        //     { url: "~/images/bdr1.jpg" },
        //     { url: "~/images/bdr2.jpg" },
        //     // { url: "~/images/whoweare.jpg" }
        //   ]
        // }
        this.pictureArr = {
            current: 2,
            lst: [
                { url: "~/images/IMG_1_MALLOY_1200x600px.jpg" },
                { url: "~/images/IMG_2_MALLOY_1200x600px.jpg" },
                { url: "~/images/IMG_3_MALLOY_1200x600px.jpg" }
            ]
        };
    };
    HomeComponent.prototype.export = function () {
        var that = this;
        permissions.requestPermission([
            "android.permission.INTERNET",
            "android.permission.READ_EXTERNAL_STORAGE",
            "android.permission.WRITE_EXTERNAL_STORAGE",
        ], "I need these permissions")
            .then(function (res) {
            console.log("Permissions granted!");
            var file;
            var fileName = "robots.txt";
            var androidDownloadsPath = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).toString();
            var customFolderPath = fs.path.join(androidDownloadsPath, "customFolder");
            var folder = fs.Folder.fromPath(customFolderPath);
            var path = fs.path.join(customFolderPath, fileName);
            var exists = fs.File.exists(path);
            file = fs.File.fromPath(path);
            var filestring = '';
            that.database.all("SELECT * FROM people").then(function (rows) {
                that.people = [];
                for (var row in rows) {
                    filestring = filestring + "" + rows[row][1] + ";" + rows[row][2] + ';\n';
                }
                file.writeText(filestring)
                    .then(function (result) {
                    console.log(result);
                    file.readText()
                        .then(function (res) {
                        var successMessage = "Successfully saved in " + file.path;
                        var writtenContent = res;
                        var isItemVisible = true;
                        console.log(successMessage);
                    });
                }).catch(function (err) {
                    console.log(err);
                });
            }, function (error) {
                console.log("SELECT ERROR", error);
            });
        })
            .catch(function () {
            this.exportfile();
            console.log("No permissions - plan B time!");
        });
    };
    HomeComponent.prototype.onDoubleTap = function (args) {
        this.showModalGender();
    };
    HomeComponent.prototype.showModalGender = function () {
        var _this = this;
        var options = {
            context: {},
            fullscreen: false,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(adminmodal_component_1.admimmodal, options).then(function (res) {
            var resp = res;
            if (res) {
                _this.export();
            }
        });
    };
    HomeComponent.prototype.onSwipe = function (args) {
        if (args.direction > 0) {
            this.page.actionBarHidden = false;
            this.showactionbar = true;
        }
    };
    HomeComponent.prototype.onChangeMail = function (event) {
        this.resetAllTimer();
        if (this.validateEmail(this.userMail))
            this.validMail = true;
        else
            this.validMail = false;
    };
    HomeComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    HomeComponent.prototype.showconfirmmodal = function () {
        var _this = this;
        var options = {
            context: {},
            fullscreen: false,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(confirm_component_1.confirmmodal, options).then(function (res) {
            var resp = res;
            _this.userMail = '';
        });
    };
    HomeComponent.prototype.onTap = function (args) {
        this.FirstCheckBox.nativeElement.checked;
        if (this.FirstCheckBox.nativeElement.checked == true) {
            this.resetAllTimer();
            if (this.validateEmail(this.userMail)) {
                this.insert(new userRegistration(this.userMail, 1));
                this.validMail = true;
                this.export();
                this.showconfirmmodal();
                this.userMail = '';
                this.mailGrabberService.setMail('');
            }
            else
                this.validMail = false;
        }
    };
    HomeComponent.prototype.fetch = function () {
        var _this = this;
        this.database.all("SELECT * FROM people").then(function (rows) {
            _this.people = [];
            for (var row in rows) {
                _this.people.push({
                    "mail": rows[row][1],
                    "flagPrivacy": rows[row][2]
                });
            }
        }, function (error) {
            console.log("SELECT ERROR", error);
        });
    };
    HomeComponent.prototype.insert = function (usr) {
        var _this = this;
        this.database.execSQL("INSERT INTO people (mail, flagPrivacy) VALUES (?, ?)", [usr.Mail, usr.FlagPrivacy]).then(function (id) {
            console.log("INSERT RESULT", id);
            _this.fetch();
        }, function (error) {
            console.log("INSERT ERROR", error);
        });
    };
    HomeComponent.prototype.readPrivacy = function () {
        this.mailGrabberService.setMail(this.userMail);
        this.router.navigate(["/privacy"]);
        // this.showPrivacyPol=true
    };
    HomeComponent.prototype.onFocusMail = function () {
        clearTimeout(this.picSlideTimer);
        clearTimeout(this.generalTimer);
    };
    HomeComponent.prototype.onBlurMail = function () {
        this.resetAllTimer();
    };
    HomeComponent.prototype.hideSlider = function () {
        this.showSlide = false;
        this.resetAllTimer();
    };
    HomeComponent.prototype.nextPict = function () {
        this.pictureArr.current = this.pictureArr.current + 1;
        if (this.pictureArr.current == this.pictureArr.lst.length) {
            this.pictureArr.current = 0;
        }
        this.myImageSource = this.pictureArr.lst[this.pictureArr.current].url;
        this.timeout();
    };
    HomeComponent.prototype.resetAllTimer = function () {
        clearTimeout(this.picSlideTimer);
        clearTimeout(this.generalTimer);
        this.openSliderTimed(90000);
    };
    HomeComponent.prototype.timeout = function () {
        var _this = this;
        this.picSlideTimer = setTimeout(function () {
            _this.nextPict();
        }, 5000);
    };
    HomeComponent.prototype.showSlider = function () {
        this.page.actionBarHidden = true;
        this.showactionbar = false;
        if (!this.showSlide)
            this.timeout();
        this.showSlide = true;
    };
    HomeComponent.prototype.openSliderTimed = function (time) {
        var _this = this;
        if (this.showSlide === false)
            this.generalTimer = setTimeout(function () {
                _this.showSlider();
            }, time);
    };
    HomeComponent.prototype.ngOnInit = function () {
        this.userMail = this.mailGrabberService.getMail();
        this.initializePicture();
        this.openSliderTimed(50000);
    };
    __decorate([
        core_1.ViewChild("CB1"),
        __metadata("design:type", core_1.ElementRef)
    ], HomeComponent.prototype, "FirstCheckBox", void 0);
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "home-app",
            templateUrl: './home.component.html'
        }),
        __metadata("design:paramtypes", [page_1.Page,
            core_1.ViewContainerRef,
            dialogs_1.ModalDialogService,
            router_1.Router,
            mailgrabber_service_1.mailgrabberService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
