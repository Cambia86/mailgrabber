"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var adminmodal_component_1 = require("../shared/modal/admin/adminmodal.component");
var Sqlite = require("nativescript-sqlite");
// import { formArrayNameProvider } from "@angular/forms";
var fs = require("file-system");
var permissions = require("nativescript-permissions");
var confirm_component_1 = require("~/shared/modal/confirm/confirm.component");
var router_1 = require("@angular/router");
var userRegistration = /** @class */ (function () {
    function userRegistration(mail, flagPrivacy) {
        this.Mail = mail;
        this.FlagPrivacy = flagPrivacy;
    }
    return userRegistration;
}());
exports.userRegistration = userRegistration;
var HomeComponent = /** @class */ (function () {
    function HomeComponent(page, vcRef, modal, router) {
        var _this = this;
        this.page = page;
        this.vcRef = vcRef;
        this.modal = modal;
        this.router = router;
        this.showSlide = false;
        this.myImageSource = "~/images/boxeur-des-rues.jpg";
        this.showactionbar = false;
        this.validMail = true;
        this.showPrivacyPol = false;
        this.tvtext = '';
        page.actionBarHidden = true;
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
        this.pictureArr = {
            current: 2,
            lst: [
                { url: "~/images/boxeur-des-rues.jpg" },
                { url: "~/images/boxeurwhite.jpg" },
                { url: "~/images/whoweare.jpg" }
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
                    filestring = filestring + "mail: " + rows[row][1] + " privacy:" + rows[row][2] + '\n';
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
                this.showconfirmmodal();
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
        if (this.pictureArr.current == 3) {
            this.pictureArr.current = 0;
        }
        this.myImageSource = this.pictureArr.lst[this.pictureArr.current].url;
        this.timeout();
    };
    HomeComponent.prototype.resetAllTimer = function () {
        clearTimeout(this.picSlideTimer);
        clearTimeout(this.generalTimer);
        this.openSliderTimed(30000);
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
            router_1.Router])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE0RjtBQUM1RixnQ0FBK0I7QUFDL0IsbUVBQTZFO0FBQzdFLG1GQUF1RTtBQUd2RSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUM1QywwREFBMEQ7QUFDMUQsZ0NBQWlDO0FBQ2pDLHNEQUF3RDtBQUN4RCw4RUFBd0U7QUFHeEUsMENBQXlFO0FBWXpFO0lBSUUsMEJBQVksSUFBWSxFQUFFLFdBQW1CO1FBQzNDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFBO0lBQ2hDLENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUFSRCxJQVFDO0FBUlksNENBQWdCO0FBbUI3QjtJQWVFLHVCQUNVLElBQVUsRUFDVixLQUF1QixFQUN2QixLQUF5QixFQUN6QixNQUFhO1FBSnZCLGlCQWlCQztRQWhCUyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdkIsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFDekIsV0FBTSxHQUFOLE1BQU0sQ0FBTztRQWhCaEIsY0FBUyxHQUFHLEtBQUssQ0FBQTtRQUVqQixrQkFBYSxHQUFHLDhCQUE4QixDQUFBO1FBRTlDLGtCQUFhLEdBQVksS0FBSyxDQUFBO1FBRzlCLGNBQVMsR0FBWSxJQUFJLENBQUE7UUFFekIsbUJBQWMsR0FBUyxLQUFLLENBQUE7UUFDNUIsV0FBTSxHQUFRLEVBQUUsQ0FBQTtRQU9yQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUU1QixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixDQUFDLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFD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QkFBaUIsRUFBRSxDQUFBO1FBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDN0IsQ0FBQztJQWpQaUI7UUFBakIsZ0JBQVMsQ0FBQyxLQUFLLENBQUM7a0NBQWdCLGlCQUFVO3dEQUFDO0lBWGpDLGFBQWE7UUFSekIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsdUJBQXVCO1NBQ3JDLENBQUM7eUNBb0JnQixXQUFJO1lBQ0gsdUJBQWdCO1lBQ2hCLDRCQUFrQjtZQUNsQixlQUFNO09BbkJaLGFBQWEsQ0E2UHpCO0lBQUQsb0JBQUM7Q0FBQSxBQTdQRCxJQTZQQztBQTdQWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmICwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcbmltcG9ydCB7IGFkbWltbW9kYWwgfSBmcm9tICcuLi9zaGFyZWQvbW9kYWwvYWRtaW4vYWRtaW5tb2RhbC5jb21wb25lbnQnXG5pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwidWkvYnV0dG9uXCI7XG52YXIgU3FsaXRlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1zcWxpdGVcIik7XG4vLyBpbXBvcnQgeyBmb3JtQXJyYXlOYW1lUHJvdmlkZXIgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmaWxlLXN5c3RlbVwiXG5pbXBvcnQgKiBhcyBwZXJtaXNzaW9ucyBmcm9tIFwibmF0aXZlc2NyaXB0LXBlcm1pc3Npb25zXCI7XG5pbXBvcnQgeyBjb25maXJtbW9kYWwgfSBmcm9tIFwifi9zaGFyZWQvbW9kYWwvY29uZmlybS9jb25maXJtLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgcGxhdGZvcm1OYXRpdmVTY3JpcHREeW5hbWljIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3BsYXRmb3JtXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25TdGFydCwgTmF2aWdhdGlvbkVuZCB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IHJvdXRlcyB9IGZyb20gXCIuLi9hcHAucm91dGluZ1wiO1xuaW1wb3J0IHtcbiAgR2VzdHVyZUV2ZW50RGF0YSxcbiAgUGFuR2VzdHVyZUV2ZW50RGF0YSxcbiAgUGluY2hHZXN0dXJlRXZlbnREYXRhLFxuICBSb3RhdGlvbkdlc3R1cmVFdmVudERhdGEsXG4gIFN3aXBlR2VzdHVyZUV2ZW50RGF0YSxcbiAgVG91Y2hHZXN0dXJlRXZlbnREYXRhXG59IGZyb20gXCJ1aS9nZXN0dXJlc1wiO1xuXG5kZWNsYXJlIHZhciBhbmRyb2lkOiBhbnk7XG5leHBvcnQgY2xhc3MgdXNlclJlZ2lzdHJhdGlvbiB7XG4gIE1haWw6IHN0cmluZztcbiAgRmxhZ1ByaXZhY3k6IG51bWJlclxuXG4gIGNvbnN0cnVjdG9yKG1haWw6IHN0cmluZywgZmxhZ1ByaXZhY3k6IG51bWJlcikge1xuICAgIHRoaXMuTWFpbCA9IG1haWxcbiAgICB0aGlzLkZsYWdQcml2YWN5ID0gZmxhZ1ByaXZhY3lcbiAgfVxufVxuXG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogXCJob21lLWFwcFwiLFxuICB0ZW1wbGF0ZVVybDogJy4vaG9tZS5jb21wb25lbnQuaHRtbCdcbn0pXG5cblxuXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHByaXZhdGUgZGF0YWJhc2U6IGFueTtcbiAgcHVibGljIHBpY3R1cmVBcnJcbiAgcHVibGljIHNob3dTbGlkZSA9IGZhbHNlXG4gIHB1YmxpYyBwaWNTbGlkZVRpbWVyXG4gIHB1YmxpYyBteUltYWdlU291cmNlID0gXCJ+L2ltYWdlcy9ib3hldXItZGVzLXJ1ZXMuanBnXCJcbiAgcHVibGljIGdlbmVyYWxUaW1lclxuICBwdWJsaWMgc2hvd2FjdGlvbmJhcjogYm9vbGVhbiA9IGZhbHNlXG4gIHB1YmxpYyB1c2VyTWFpbDogc3RyaW5nXG4gIHB1YmxpYyBwZW9wbGU6IEFycmF5PGFueT47XG4gIHB1YmxpYyB2YWxpZE1haWw6IGJvb2xlYW4gPSB0cnVlXG4gIEBWaWV3Q2hpbGQoXCJDQjFcIikgRmlyc3RDaGVja0JveDogRWxlbWVudFJlZjtcbiAgcHVibGljIHNob3dQcml2YWN5UG9sOmJvb2xlYW49ZmFsc2VcbiAgcHVibGljIHR2dGV4dDpzdHJpbmc9JydcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIG1vZGFsOiBNb2RhbERpYWxvZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSByb3V0ZXI6Um91dGVyKSB7XG4gICAgcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuXG4gICAgdGhpcy5wZW9wbGUgPSBbXTtcbiAgICAobmV3IFNxbGl0ZShcIm15Lm1haWxkYlwiKSkudGhlbihkYiA9PiB7XG4gICAgICBkYi5leGVjU1FMKFwiQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgcGVvcGxlIChpZCBJTlRFR0VSIFBSSU1BUlkgS0VZIEFVVE9JTkNSRU1FTlQsIG1haWwgVEVYVCwgZmxhZ1ByaXZhY3kgSU5URUdFUilcIikudGhlbihpZCA9PiB7XG4gICAgICAgIHRoaXMuZGF0YWJhc2UgPSBkYjtcbiAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJDUkVBVEUgVEFCTEUgRVJST1JcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gICAgfSwgZXJyb3IgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJPUEVOIERCIEVSUk9SXCIsIGVycm9yKTtcbiAgICB9KTtcbiAgfVxuXG4gIGluaXRpYWxpemVQaWN0dXJlKCkge1xuICAgIHRoaXMucGljdHVyZUFyciA9IHtcbiAgICAgIGN1cnJlbnQ6IDIsXG4gICAgICBsc3Q6IFtcbiAgICAgICAgeyB1cmw6IFwifi9pbWFnZXMvYm94ZXVyLWRlcy1ydWVzLmpwZ1wiIH0sXG4gICAgICAgIHsgdXJsOiBcIn4vaW1hZ2VzL2JveGV1cndoaXRlLmpwZ1wiIH0sXG4gICAgICAgIHsgdXJsOiBcIn4vaW1hZ2VzL3dob3dlYXJlLmpwZ1wiIH1cblxuICAgICAgXVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCgpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXNcbiAgICBwZXJtaXNzaW9ucy5yZXF1ZXN0UGVybWlzc2lvbihbXG4gICAgICBcImFuZHJvaWQucGVybWlzc2lvbi5JTlRFUk5FVFwiLFxuICAgICAgXCJhbmRyb2lkLnBlcm1pc3Npb24uUkVBRF9FWFRFUk5BTF9TVE9SQUdFXCIsXG4gICAgICBcImFuZHJvaWQucGVybWlzc2lvbi5XUklURV9FWFRFUk5BTF9TVE9SQUdFXCIsXG4gICAgXSwgXCJJIG5lZWQgdGhlc2UgcGVybWlzc2lvbnNcIilcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJQZXJtaXNzaW9ucyBncmFudGVkIVwiKTtcbiAgICAgICAgdmFyIGZpbGU6IGZzLkZpbGU7XG4gICAgICAgIHZhciBmaWxlTmFtZSA9IFwicm9ib3RzLnR4dFwiO1xuICAgICAgICB2YXIgYW5kcm9pZERvd25sb2Fkc1BhdGggPSBhbmRyb2lkLm9zLkVudmlyb25tZW50LmdldEV4dGVybmFsU3RvcmFnZVB1YmxpY0RpcmVjdG9yeShhbmRyb2lkLm9zLkVudmlyb25tZW50LkRJUkVDVE9SWV9ET1dOTE9BRFMpLnRvU3RyaW5nKCk7XG4gICAgICAgIHZhciBjdXN0b21Gb2xkZXJQYXRoID0gZnMucGF0aC5qb2luKGFuZHJvaWREb3dubG9hZHNQYXRoLCBcImN1c3RvbUZvbGRlclwiKTtcblxuICAgICAgICB2YXIgZm9sZGVyID0gZnMuRm9sZGVyLmZyb21QYXRoKGN1c3RvbUZvbGRlclBhdGgpO1xuICAgICAgICB2YXIgcGF0aCA9IGZzLnBhdGguam9pbihjdXN0b21Gb2xkZXJQYXRoLCBmaWxlTmFtZSk7XG4gICAgICAgIHZhciBleGlzdHMgPSBmcy5GaWxlLmV4aXN0cyhwYXRoKTtcblxuICAgICAgICBmaWxlID0gZnMuRmlsZS5mcm9tUGF0aChwYXRoKTtcblxuICAgICAgICBsZXQgZmlsZXN0cmluZyA9ICcnXG4gICAgICAgIHRoYXQuZGF0YWJhc2UuYWxsKFwiU0VMRUNUICogRlJPTSBwZW9wbGVcIikudGhlbihyb3dzID0+IHtcbiAgICAgICAgICB0aGF0LnBlb3BsZSA9IFtdO1xuICAgICAgICAgIGZvciAodmFyIHJvdyBpbiByb3dzKSB7XG4gICAgICAgICAgICBmaWxlc3RyaW5nID0gZmlsZXN0cmluZyArIFwibWFpbDogXCIgKyByb3dzW3Jvd11bMV0gKyBcIiBwcml2YWN5OlwiICsgcm93c1tyb3ddWzJdICsgJ1xcbidcblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZpbGUud3JpdGVUZXh0KGZpbGVzdHJpbmcpXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICBmaWxlLnJlYWRUZXh0KClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgbGV0IHN1Y2Nlc3NNZXNzYWdlID0gXCJTdWNjZXNzZnVsbHkgc2F2ZWQgaW4gXCIgKyBmaWxlLnBhdGg7XG4gICAgICAgICAgICAgICAgICBsZXQgd3JpdHRlbkNvbnRlbnQgPSByZXM7XG4gICAgICAgICAgICAgICAgICBsZXQgaXNJdGVtVmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzdWNjZXNzTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlNFTEVDVCBFUlJPUlwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuXG5cblxuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy5leHBvcnRmaWxlKClcbiAgICAgICAgY29uc29sZS5sb2coXCJObyBwZXJtaXNzaW9ucyAtIHBsYW4gQiB0aW1lIVwiKTtcbiAgICAgIH0pO1xuICB9XG5cblxuICBvbkRvdWJsZVRhcChhcmdzOiBHZXN0dXJlRXZlbnREYXRhKSB7XG4gICAgdGhpcy5zaG93TW9kYWxHZW5kZXIoKVxuICB9XG5cbiAgcHVibGljIHNob3dNb2RhbEdlbmRlcigpIHtcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgIGNvbnRleHQ6IHt9LFxuICAgICAgZnVsbHNjcmVlbjogZmFsc2UsXG4gICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmXG4gICAgfTtcbiAgICB0aGlzLm1vZGFsLnNob3dNb2RhbChhZG1pbW1vZGFsLCBvcHRpb25zKS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgcmVzcCA9IHJlcztcbiAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgdGhpcy5leHBvcnQoKVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgb25Td2lwZShhcmdzOiBTd2lwZUdlc3R1cmVFdmVudERhdGEpIHtcblxuICAgIGlmIChhcmdzLmRpcmVjdGlvbiA+IDApIHtcbiAgICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSBmYWxzZTtcbiAgICAgIHRoaXMuc2hvd2FjdGlvbmJhciA9IHRydWVcbiAgICB9XG4gIH1cblxuXG5cbiAgb25DaGFuZ2VNYWlsKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMudmFsaWRhdGVFbWFpbCh0aGlzLnVzZXJNYWlsKSlcbiAgICAgIHRoaXMudmFsaWRNYWlsID0gdHJ1ZVxuICAgIGVsc2VcbiAgICAgIHRoaXMudmFsaWRNYWlsID0gZmFsc2VcbiAgfVxuXG4gIHZhbGlkYXRlRW1haWwoZW1haWwpIHtcbiAgICB2YXIgcmUgPSAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXF0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvO1xuICAgIHJldHVybiByZS50ZXN0KFN0cmluZyhlbWFpbCkudG9Mb3dlckNhc2UoKSk7XG4gIH1cblxuICBzaG93Y29uZmlybW1vZGFsKCkge1xuICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgY29udGV4dDoge30sXG4gICAgICBmdWxsc2NyZWVuOiBmYWxzZSxcbiAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWZcbiAgICB9O1xuICAgIHRoaXMubW9kYWwuc2hvd01vZGFsKGNvbmZpcm1tb2RhbCwgb3B0aW9ucykudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHJlc3AgPSByZXM7XG4gICAgICB0aGlzLnVzZXJNYWlsID0gJydcbiAgICB9KTtcbiAgfVxuXG4gIG9uVGFwKGFyZ3M6IEV2ZW50RGF0YSkge1xuICAgIHRoaXMuRmlyc3RDaGVja0JveC5uYXRpdmVFbGVtZW50LmNoZWNrZWRcbiAgICBpZiAodGhpcy5GaXJzdENoZWNrQm94Lm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCA9PSB0cnVlKSB7XG4gICAgICB0aGlzLnJlc2V0QWxsVGltZXIoKVxuICAgICAgaWYgKHRoaXMudmFsaWRhdGVFbWFpbCh0aGlzLnVzZXJNYWlsKSkge1xuICAgICAgICB0aGlzLmluc2VydChuZXcgdXNlclJlZ2lzdHJhdGlvbih0aGlzLnVzZXJNYWlsLCAxKSlcbiAgICAgICAgdGhpcy52YWxpZE1haWwgPSB0cnVlXG4gICAgICAgIHRoaXMuc2hvd2NvbmZpcm1tb2RhbCgpXG4gICAgICB9XG4gICAgICBlbHNlXG4gICAgICAgIHRoaXMudmFsaWRNYWlsID0gZmFsc2VcbiAgICB9XG4gICAgXG4gIH1cblxuXG4gIHB1YmxpYyBmZXRjaCgpIHtcbiAgICB0aGlzLmRhdGFiYXNlLmFsbChcIlNFTEVDVCAqIEZST00gcGVvcGxlXCIpLnRoZW4ocm93cyA9PiB7XG4gICAgICB0aGlzLnBlb3BsZSA9IFtdO1xuICAgICAgZm9yICh2YXIgcm93IGluIHJvd3MpIHtcbiAgICAgICAgdGhpcy5wZW9wbGUucHVzaCh7XG4gICAgICAgICAgXCJtYWlsXCI6IHJvd3Nbcm93XVsxXSxcbiAgICAgICAgICBcImZsYWdQcml2YWN5XCI6IHJvd3Nbcm93XVsyXVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCBlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIlNFTEVDVCBFUlJPUlwiLCBlcnJvcik7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgaW5zZXJ0KHVzcjogdXNlclJlZ2lzdHJhdGlvbikge1xuICAgIHRoaXMuZGF0YWJhc2UuZXhlY1NRTChcIklOU0VSVCBJTlRPIHBlb3BsZSAobWFpbCwgZmxhZ1ByaXZhY3kpIFZBTFVFUyAoPywgPylcIiwgW3Vzci5NYWlsLCB1c3IuRmxhZ1ByaXZhY3ldKS50aGVuKGlkID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiSU5TRVJUIFJFU1VMVFwiLCBpZCk7XG4gICAgICB0aGlzLmZldGNoKCk7XG4gICAgfSwgZXJyb3IgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJJTlNFUlQgRVJST1JcIiwgZXJyb3IpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVhZFByaXZhY3koKXtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvcHJpdmFjeVwiXSlcbiAgICAvLyB0aGlzLnNob3dQcml2YWN5UG9sPXRydWVcbiAgfVxuIFxuICBvbkZvY3VzTWFpbCgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5waWNTbGlkZVRpbWVyKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5nZW5lcmFsVGltZXIpO1xuICB9XG5cbiAgb25CbHVyTWFpbCgpIHtcbiAgICB0aGlzLnJlc2V0QWxsVGltZXIoKVxuICB9XG5cbiAgaGlkZVNsaWRlcigpIHtcbiAgICB0aGlzLnNob3dTbGlkZSA9IGZhbHNlXG4gICAgdGhpcy5yZXNldEFsbFRpbWVyKClcbiAgfVxuXG4gIG5leHRQaWN0KCkge1xuICAgIHRoaXMucGljdHVyZUFyci5jdXJyZW50ID0gdGhpcy5waWN0dXJlQXJyLmN1cnJlbnQgKyAxXG4gICAgaWYgKHRoaXMucGljdHVyZUFyci5jdXJyZW50ID09IDMpIHtcbiAgICAgIHRoaXMucGljdHVyZUFyci5jdXJyZW50ID0gMFxuICAgIH1cbiAgICB0aGlzLm15SW1hZ2VTb3VyY2UgPSB0aGlzLnBpY3R1cmVBcnIubHN0W3RoaXMucGljdHVyZUFyci5jdXJyZW50XS51cmxcbiAgICB0aGlzLnRpbWVvdXQoKTtcbiAgfVxuXG4gIHJlc2V0QWxsVGltZXIoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucGljU2xpZGVUaW1lcik7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuZ2VuZXJhbFRpbWVyKTtcbiAgICB0aGlzLm9wZW5TbGlkZXJUaW1lZCgzMDAwMClcbiAgfVxuXG4gIHRpbWVvdXQoKSB7XG4gICAgdGhpcy5waWNTbGlkZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLm5leHRQaWN0KClcbiAgICB9LCA1MDAwKTtcbiAgfVxuXG4gIHNob3dTbGlkZXIoKSB7XG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgdGhpcy5zaG93YWN0aW9uYmFyID0gZmFsc2VcbiAgICBpZiAoIXRoaXMuc2hvd1NsaWRlKVxuICAgICAgdGhpcy50aW1lb3V0KClcbiAgICB0aGlzLnNob3dTbGlkZSA9IHRydWVcblxuICB9XG5cbiAgb3BlblNsaWRlclRpbWVkKHRpbWUpIHtcbiAgICBpZiAodGhpcy5zaG93U2xpZGUgPT09IGZhbHNlKVxuICAgICAgdGhpcy5nZW5lcmFsVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zaG93U2xpZGVyKClcbiAgICAgIH0sIHRpbWUpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pbml0aWFsaXplUGljdHVyZSgpXG4gICAgdGhpcy5vcGVuU2xpZGVyVGltZWQoNTAwMDApXG4gIH1cbn0iXX0=