"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var adminmodal_component_1 = require("./shared/modal/admin/adminmodal.component");
var Sqlite = require("nativescript-sqlite");
// import { formArrayNameProvider } from "@angular/forms";
var fs = require("file-system");
var permissions = require("nativescript-permissions");
var confirm_component_1 = require("~/shared/modal/confirm/confirm.component");
var userRegistration = /** @class */ (function () {
    function userRegistration(mail, flagPrivacy) {
        this.Mail = mail;
        this.FlagPrivacy = flagPrivacy;
    }
    return userRegistration;
}());
exports.userRegistration = userRegistration;
var AppComponent = /** @class */ (function () {
    function AppComponent(page, vcRef, modal) {
        var _this = this;
        this.page = page;
        this.vcRef = vcRef;
        this.modal = modal;
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
    AppComponent.prototype.initializePicture = function () {
        this.pictureArr = {
            current: 2,
            lst: [
                { url: "~/images/boxeur-des-rues.jpg" },
                { url: "~/images/boxeurwhite.jpg" },
                { url: "~/images/whoweare.jpg" }
            ]
        };
    };
    AppComponent.prototype.export = function () {
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
    AppComponent.prototype.onDoubleTap = function (args) {
        this.showModalGender();
    };
    AppComponent.prototype.showModalGender = function () {
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
    AppComponent.prototype.onSwipe = function (args) {
        if (args.direction > 0) {
            this.page.actionBarHidden = false;
            this.showactionbar = true;
        }
    };
    AppComponent.prototype.onChangeMail = function (event) {
        if (this.validateEmail(this.userMail))
            this.validMail = true;
        else
            this.validMail = false;
    };
    AppComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    AppComponent.prototype.showconfirmmodal = function () {
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
    AppComponent.prototype.onTap = function (args) {
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
    AppComponent.prototype.fetch = function () {
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
    AppComponent.prototype.insert = function (usr) {
        var _this = this;
        this.database.execSQL("INSERT INTO people (mail, flagPrivacy) VALUES (?, ?)", [usr.Mail, usr.FlagPrivacy]).then(function (id) {
            console.log("INSERT RESULT", id);
            _this.fetch();
        }, function (error) {
            console.log("INSERT ERROR", error);
        });
    };
    AppComponent.prototype.readPrivacy = function () {
        this.showPrivacyPol = true;
        this.tvtext = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quam nulla, commodo eget gravida sed, tristique sed ante. Mauris auctor, lorem id tincidunt tempor, velit nunc pharetra dolor, at ullamcorper nisl erat in eros. Sed tincidunt elit ac augue ultrices, aliquet pretium orci cursus. Aliquam semper sagittis magna sit amet semper. Etiam ligula odio, convallis non rutrum nec, finibus ut ex. Vestibulum pellentesque aliquet justo, id maximus justo pulvinar non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur posuere nec odio eu porttitor. Pellentesque tellus nulla, condimentum quis arcu ut, venenatis elementum nunc. Morbi condimentum ac lectus et condimentum. Phasellus in dictum nibh. Curabitur sed lobortis velit. Cras hendrerit eros in erat feugiat, id aliquet enim gravida.";
    };
    AppComponent.prototype.back = function () {
        this.showPrivacyPol = false;
        this.tvtext = '';
    };
    AppComponent.prototype.onFocusMail = function () {
        clearTimeout(this.picSlideTimer);
        clearTimeout(this.generalTimer);
    };
    AppComponent.prototype.onBlurMail = function () {
        this.resetAllTimer();
    };
    AppComponent.prototype.hideSlider = function () {
        this.showSlide = false;
        this.resetAllTimer();
    };
    AppComponent.prototype.nextPict = function () {
        this.pictureArr.current = this.pictureArr.current + 1;
        if (this.pictureArr.current == 3) {
            this.pictureArr.current = 0;
        }
        this.myImageSource = this.pictureArr.lst[this.pictureArr.current].url;
        this.timeout();
    };
    AppComponent.prototype.resetAllTimer = function () {
        clearTimeout(this.picSlideTimer);
        clearTimeout(this.generalTimer);
        this.openSliderTimed(30000);
    };
    AppComponent.prototype.timeout = function () {
        var _this = this;
        this.picSlideTimer = setTimeout(function () {
            _this.nextPict();
        }, 5000);
    };
    AppComponent.prototype.showSlider = function () {
        this.page.actionBarHidden = true;
        this.showactionbar = false;
        if (!this.showSlide)
            this.timeout();
        this.showSlide = true;
    };
    AppComponent.prototype.openSliderTimed = function (time) {
        var _this = this;
        if (this.showSlide === false)
            this.generalTimer = setTimeout(function () {
                _this.showSlider();
            }, time);
    };
    AppComponent.prototype.ngOnInit = function () {
        this.initializePicture();
        this.openSliderTimed(100000);
    };
    __decorate([
        core_1.ViewChild("CB1"),
        __metadata("design:type", core_1.ElementRef)
    ], AppComponent.prototype, "FirstCheckBox", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "app.component.html"
        }),
        __metadata("design:paramtypes", [page_1.Page,
            core_1.ViewContainerRef,
            dialogs_1.ModalDialogService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBb0c7QUFTcEcsZ0NBQStCO0FBQy9CLG1FQUE2RTtBQUM3RSxrRkFBc0U7QUFHdEUsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDNUMsMERBQTBEO0FBQzFELGdDQUFpQztBQUNqQyxzREFBd0Q7QUFDeEQsOEVBQXdFO0FBU3hFO0lBTUUsMEJBQVksSUFBWSxFQUFFLFdBQW1CO1FBQzNDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFBO0lBQ2hDLENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUFWRCxJQVVDO0FBVlksNENBQWdCO0FBbUI3QjtJQWVFLHNCQUNVLElBQVUsRUFDVixLQUF1QixFQUN2QixLQUF5QjtRQUhuQyxpQkFnQkM7UUFmUyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdkIsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFmNUIsY0FBUyxHQUFHLEtBQUssQ0FBQTtRQUVqQixrQkFBYSxHQUFHLDhCQUE4QixDQUFBO1FBRTlDLGtCQUFhLEdBQVksS0FBSyxDQUFBO1FBRzlCLGNBQVMsR0FBWSxJQUFJLENBQUE7UUFFekIsbUJBQWMsR0FBUyxLQUFLLENBQUE7UUFDNUIsV0FBTSxHQUFRLEVBQUUsQ0FBQTtRQU1yQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUU1QixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixDQUFDLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtZQUMvQixFQUFFLENBQUMsT0FBTyxDQUFDLDBHQUEwRyxDQUFDLENBQUMs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Q0FBQztJQUNiLENBQUM7SUFFRCwrQkFBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUE7UUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUM5QixDQUFDO0lBcFBpQjtRQUFqQixnQkFBUyxDQUFDLEtBQUssQ0FBQztrQ0FBZ0IsaUJBQVU7dURBQUM7SUFYakMsWUFBWTtRQVB4QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLG9CQUFvQjtTQUNsQyxDQUFDO3lDQW9CZ0IsV0FBSTtZQUNILHVCQUFnQjtZQUNoQiw0QkFBa0I7T0FsQnhCLFlBQVksQ0FnUXhCO0lBQUQsbUJBQUM7Q0FBQSxBQWhRRCxJQWdRQztBQWhRWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LE5nTW9kdWxlLCBWaWV3Q29udGFpbmVyUmVmLCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtcbiAgR2VzdHVyZUV2ZW50RGF0YSxcbiAgUGFuR2VzdHVyZUV2ZW50RGF0YSxcbiAgUGluY2hHZXN0dXJlRXZlbnREYXRhLFxuICBSb3RhdGlvbkdlc3R1cmVFdmVudERhdGEsXG4gIFN3aXBlR2VzdHVyZUV2ZW50RGF0YSxcbiAgVG91Y2hHZXN0dXJlRXZlbnREYXRhXG59IGZyb20gXCJ1aS9nZXN0dXJlc1wiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5pbXBvcnQgeyBhZG1pbW1vZGFsIH0gZnJvbSAnLi9zaGFyZWQvbW9kYWwvYWRtaW4vYWRtaW5tb2RhbC5jb21wb25lbnQnXG5pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwidWkvYnV0dG9uXCI7XG52YXIgU3FsaXRlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1zcWxpdGVcIik7XG4vLyBpbXBvcnQgeyBmb3JtQXJyYXlOYW1lUHJvdmlkZXIgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmaWxlLXN5c3RlbVwiXG5pbXBvcnQgKiBhcyBwZXJtaXNzaW9ucyBmcm9tIFwibmF0aXZlc2NyaXB0LXBlcm1pc3Npb25zXCI7XG5pbXBvcnQgeyBjb25maXJtbW9kYWwgfSBmcm9tIFwifi9zaGFyZWQvbW9kYWwvY29uZmlybS9jb25maXJtLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgcGxhdGZvcm1OYXRpdmVTY3JpcHREeW5hbWljIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3BsYXRmb3JtXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25TdGFydCwgTmF2aWdhdGlvbkVuZCB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IHJvdXRlcyB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XG4vLyBpbXBvcnQgeyBGaXJzdENvbXBvbmVudCwgU2Vjb25kQ29tcG9uZW50IH0gZnJvbSBcIi4vcHJpdmFjeS9wcml2YWN5LmNvbXBvbmVudFwiO1xuXG5cbmRlY2xhcmUgdmFyIGFuZHJvaWQ6IGFueTtcbmV4cG9ydCBjbGFzcyB1c2VyUmVnaXN0cmF0aW9uIHtcbiAgTWFpbDogc3RyaW5nO1xuICBGbGFnUHJpdmFjeTogbnVtYmVyXG5cblxuXG4gIGNvbnN0cnVjdG9yKG1haWw6IHN0cmluZywgZmxhZ1ByaXZhY3k6IG51bWJlcikge1xuICAgIHRoaXMuTWFpbCA9IG1haWxcbiAgICB0aGlzLkZsYWdQcml2YWN5ID0gZmxhZ1ByaXZhY3lcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibXktYXBwXCIsXG4gIHRlbXBsYXRlVXJsOiBcImFwcC5jb21wb25lbnQuaHRtbFwiXG59KVxuXG5cblxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHByaXZhdGUgZGF0YWJhc2U6IGFueTtcbiAgcHVibGljIHBpY3R1cmVBcnJcbiAgcHVibGljIHNob3dTbGlkZSA9IGZhbHNlXG4gIHB1YmxpYyBwaWNTbGlkZVRpbWVyXG4gIHB1YmxpYyBteUltYWdlU291cmNlID0gXCJ+L2ltYWdlcy9ib3hldXItZGVzLXJ1ZXMuanBnXCJcbiAgcHVibGljIGdlbmVyYWxUaW1lclxuICBwdWJsaWMgc2hvd2FjdGlvbmJhcjogYm9vbGVhbiA9IGZhbHNlXG4gIHB1YmxpYyB1c2VyTWFpbDogc3RyaW5nXG4gIHB1YmxpYyBwZW9wbGU6IEFycmF5PGFueT47XG4gIHB1YmxpYyB2YWxpZE1haWw6IGJvb2xlYW4gPSB0cnVlXG4gIEBWaWV3Q2hpbGQoXCJDQjFcIikgRmlyc3RDaGVja0JveDogRWxlbWVudFJlZjtcbiAgcHVibGljIHNob3dQcml2YWN5UG9sOmJvb2xlYW49ZmFsc2VcbiAgcHVibGljIHR2dGV4dDpzdHJpbmc9JydcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIG1vZGFsOiBNb2RhbERpYWxvZ1NlcnZpY2UpIHtcbiAgICBwYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG5cbiAgICB0aGlzLnBlb3BsZSA9IFtdO1xuICAgIChuZXcgU3FsaXRlKFwibXkubWFpbGRiXCIpKS50aGVuKGRiID0+IHtcbiAgICAgIGRiLmV4ZWNTUUwoXCJDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyBwZW9wbGUgKGlkIElOVEVHRVIgUFJJTUFSWSBLRVkgQVVUT0lOQ1JFTUVOVCwgbWFpbCBURVhULCBmbGFnUHJpdmFjeSBJTlRFR0VSKVwiKS50aGVuKGlkID0+IHtcbiAgICAgICAgdGhpcy5kYXRhYmFzZSA9IGRiO1xuICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNSRUFURSBUQUJMRSBFUlJPUlwiLCBlcnJvcik7XG4gICAgICB9KTtcbiAgICB9LCBlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIk9QRU4gREIgRVJST1JcIiwgZXJyb3IpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5pdGlhbGl6ZVBpY3R1cmUoKSB7XG4gICAgdGhpcy5waWN0dXJlQXJyID0ge1xuICAgICAgY3VycmVudDogMixcbiAgICAgIGxzdDogW1xuICAgICAgICB7IHVybDogXCJ+L2ltYWdlcy9ib3hldXItZGVzLXJ1ZXMuanBnXCIgfSxcbiAgICAgICAgeyB1cmw6IFwifi9pbWFnZXMvYm94ZXVyd2hpdGUuanBnXCIgfSxcbiAgICAgICAgeyB1cmw6IFwifi9pbWFnZXMvd2hvd2VhcmUuanBnXCIgfVxuXG4gICAgICBdXG4gICAgfVxuICB9XG5cbiAgZXhwb3J0KCkge1xuICAgIGxldCB0aGF0ID0gdGhpc1xuICAgIHBlcm1pc3Npb25zLnJlcXVlc3RQZXJtaXNzaW9uKFtcbiAgICAgIFwiYW5kcm9pZC5wZXJtaXNzaW9uLklOVEVSTkVUXCIsXG4gICAgICBcImFuZHJvaWQucGVybWlzc2lvbi5SRUFEX0VYVEVSTkFMX1NUT1JBR0VcIixcbiAgICAgIFwiYW5kcm9pZC5wZXJtaXNzaW9uLldSSVRFX0VYVEVSTkFMX1NUT1JBR0VcIixcbiAgICBdLCBcIkkgbmVlZCB0aGVzZSBwZXJtaXNzaW9uc1wiKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlBlcm1pc3Npb25zIGdyYW50ZWQhXCIpO1xuICAgICAgICB2YXIgZmlsZTogZnMuRmlsZTtcbiAgICAgICAgdmFyIGZpbGVOYW1lID0gXCJyb2JvdHMudHh0XCI7XG4gICAgICAgIHZhciBhbmRyb2lkRG93bmxvYWRzUGF0aCA9IGFuZHJvaWQub3MuRW52aXJvbm1lbnQuZ2V0RXh0ZXJuYWxTdG9yYWdlUHVibGljRGlyZWN0b3J5KGFuZHJvaWQub3MuRW52aXJvbm1lbnQuRElSRUNUT1JZX0RPV05MT0FEUykudG9TdHJpbmcoKTtcbiAgICAgICAgdmFyIGN1c3RvbUZvbGRlclBhdGggPSBmcy5wYXRoLmpvaW4oYW5kcm9pZERvd25sb2Fkc1BhdGgsIFwiY3VzdG9tRm9sZGVyXCIpO1xuXG4gICAgICAgIHZhciBmb2xkZXIgPSBmcy5Gb2xkZXIuZnJvbVBhdGgoY3VzdG9tRm9sZGVyUGF0aCk7XG4gICAgICAgIHZhciBwYXRoID0gZnMucGF0aC5qb2luKGN1c3RvbUZvbGRlclBhdGgsIGZpbGVOYW1lKTtcbiAgICAgICAgdmFyIGV4aXN0cyA9IGZzLkZpbGUuZXhpc3RzKHBhdGgpO1xuXG4gICAgICAgIGZpbGUgPSBmcy5GaWxlLmZyb21QYXRoKHBhdGgpO1xuXG4gICAgICAgIGxldCBmaWxlc3RyaW5nID0gJydcbiAgICAgICAgdGhhdC5kYXRhYmFzZS5hbGwoXCJTRUxFQ1QgKiBGUk9NIHBlb3BsZVwiKS50aGVuKHJvd3MgPT4ge1xuICAgICAgICAgIHRoYXQucGVvcGxlID0gW107XG4gICAgICAgICAgZm9yICh2YXIgcm93IGluIHJvd3MpIHtcbiAgICAgICAgICAgIGZpbGVzdHJpbmcgPSBmaWxlc3RyaW5nICsgXCJtYWlsOiBcIiArIHJvd3Nbcm93XVsxXSArIFwiIHByaXZhY3k6XCIgKyByb3dzW3Jvd11bMl0gKyAnXFxuJ1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZmlsZS53cml0ZVRleHQoZmlsZXN0cmluZylcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgIGZpbGUucmVhZFRleHQoKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICBsZXQgc3VjY2Vzc01lc3NhZ2UgPSBcIlN1Y2Nlc3NmdWxseSBzYXZlZCBpbiBcIiArIGZpbGUucGF0aDtcbiAgICAgICAgICAgICAgICAgIGxldCB3cml0dGVuQ29udGVudCA9IHJlcztcbiAgICAgICAgICAgICAgICAgIGxldCBpc0l0ZW1WaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHN1Y2Nlc3NNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiU0VMRUNUIEVSUk9SXCIsIGVycm9yKTtcbiAgICAgICAgfSk7XG5cblxuXG4gICAgICB9KVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB0aGlzLmV4cG9ydGZpbGUoKVxuICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHBlcm1pc3Npb25zIC0gcGxhbiBCIHRpbWUhXCIpO1xuICAgICAgfSk7XG4gIH1cblxuXG4gIG9uRG91YmxlVGFwKGFyZ3M6IEdlc3R1cmVFdmVudERhdGEpIHtcbiAgICB0aGlzLnNob3dNb2RhbEdlbmRlcigpXG4gIH1cblxuICBwdWJsaWMgc2hvd01vZGFsR2VuZGVyKCkge1xuICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgY29udGV4dDoge30sXG4gICAgICBmdWxsc2NyZWVuOiBmYWxzZSxcbiAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWZcbiAgICB9O1xuICAgIHRoaXMubW9kYWwuc2hvd01vZGFsKGFkbWltbW9kYWwsIG9wdGlvbnMpLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCByZXNwID0gcmVzO1xuICAgICAgaWYgKHJlcykge1xuICAgICAgICB0aGlzLmV4cG9ydCgpXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBvblN3aXBlKGFyZ3M6IFN3aXBlR2VzdHVyZUV2ZW50RGF0YSkge1xuXG4gICAgaWYgKGFyZ3MuZGlyZWN0aW9uID4gMCkge1xuICAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IGZhbHNlO1xuICAgICAgdGhpcy5zaG93YWN0aW9uYmFyID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG5cblxuICBvbkNoYW5nZU1haWwoZXZlbnQpIHtcbiAgICBpZiAodGhpcy52YWxpZGF0ZUVtYWlsKHRoaXMudXNlck1haWwpKVxuICAgICAgdGhpcy52YWxpZE1haWwgPSB0cnVlXG4gICAgZWxzZVxuICAgICAgdGhpcy52YWxpZE1haWwgPSBmYWxzZVxuICB9XG5cbiAgdmFsaWRhdGVFbWFpbChlbWFpbCkge1xuICAgIHZhciByZSA9IC9eKChbXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKFxcLltePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcXSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XG4gICAgcmV0dXJuIHJlLnRlc3QoU3RyaW5nKGVtYWlsKS50b0xvd2VyQ2FzZSgpKTtcbiAgfVxuXG4gIHNob3djb25maXJtbW9kYWwoKSB7XG4gICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICBjb250ZXh0OiB7fSxcbiAgICAgIGZ1bGxzY3JlZW46IGZhbHNlLFxuICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZlxuICAgIH07XG4gICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoY29uZmlybW1vZGFsLCBvcHRpb25zKS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgcmVzcCA9IHJlcztcbiAgICAgIHRoaXMudXNlck1haWwgPSAnJ1xuICAgIH0pO1xuICB9XG5cbiAgb25UYXAoYXJnczogRXZlbnREYXRhKSB7XG4gICAgdGhpcy5GaXJzdENoZWNrQm94Lm5hdGl2ZUVsZW1lbnQuY2hlY2tlZFxuICAgIGlmICh0aGlzLkZpcnN0Q2hlY2tCb3gubmF0aXZlRWxlbWVudC5jaGVja2VkID09IHRydWUpIHtcbiAgICAgIHRoaXMucmVzZXRBbGxUaW1lcigpXG4gICAgICBpZiAodGhpcy52YWxpZGF0ZUVtYWlsKHRoaXMudXNlck1haWwpKSB7XG4gICAgICAgIHRoaXMuaW5zZXJ0KG5ldyB1c2VyUmVnaXN0cmF0aW9uKHRoaXMudXNlck1haWwsIDEpKVxuICAgICAgICB0aGlzLnZhbGlkTWFpbCA9IHRydWVcbiAgICAgICAgdGhpcy5zaG93Y29uZmlybW1vZGFsKClcbiAgICAgIH1cbiAgICAgIGVsc2VcbiAgICAgICAgdGhpcy52YWxpZE1haWwgPSBmYWxzZVxuICAgIH1cbiAgICBcbiAgfVxuXG5cbiAgcHVibGljIGZldGNoKCkge1xuICAgIHRoaXMuZGF0YWJhc2UuYWxsKFwiU0VMRUNUICogRlJPTSBwZW9wbGVcIikudGhlbihyb3dzID0+IHtcbiAgICAgIHRoaXMucGVvcGxlID0gW107XG4gICAgICBmb3IgKHZhciByb3cgaW4gcm93cykge1xuICAgICAgICB0aGlzLnBlb3BsZS5wdXNoKHtcbiAgICAgICAgICBcIm1haWxcIjogcm93c1tyb3ddWzFdLFxuICAgICAgICAgIFwiZmxhZ1ByaXZhY3lcIjogcm93c1tyb3ddWzJdXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sIGVycm9yID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiU0VMRUNUIEVSUk9SXCIsIGVycm9yKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBpbnNlcnQodXNyOiB1c2VyUmVnaXN0cmF0aW9uKSB7XG4gICAgdGhpcy5kYXRhYmFzZS5leGVjU1FMKFwiSU5TRVJUIElOVE8gcGVvcGxlIChtYWlsLCBmbGFnUHJpdmFjeSkgVkFMVUVTICg/LCA/KVwiLCBbdXNyLk1haWwsIHVzci5GbGFnUHJpdmFjeV0pLnRoZW4oaWQgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJJTlNFUlQgUkVTVUxUXCIsIGlkKTtcbiAgICAgIHRoaXMuZmV0Y2goKTtcbiAgICB9LCBlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIklOU0VSVCBFUlJPUlwiLCBlcnJvcik7XG4gICAgfSk7XG4gIH1cblxuICByZWFkUHJpdmFjeSgpe1xuICAgIHRoaXMuc2hvd1ByaXZhY3lQb2w9dHJ1ZVxuICAgIHRoaXMudHZ0ZXh0PVwiTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4gQWVuZWFuIHF1YW0gbnVsbGEsIGNvbW1vZG8gZWdldCBncmF2aWRhIHNlZCwgdHJpc3RpcXVlIHNlZCBhbnRlLiBNYXVyaXMgYXVjdG9yLCBsb3JlbSBpZCB0aW5jaWR1bnQgdGVtcG9yLCB2ZWxpdCBudW5jIHBoYXJldHJhIGRvbG9yLCBhdCB1bGxhbWNvcnBlciBuaXNsIGVyYXQgaW4gZXJvcy4gU2VkIHRpbmNpZHVudCBlbGl0IGFjIGF1Z3VlIHVsdHJpY2VzLCBhbGlxdWV0IHByZXRpdW0gb3JjaSBjdXJzdXMuIEFsaXF1YW0gc2VtcGVyIHNhZ2l0dGlzIG1hZ25hIHNpdCBhbWV0IHNlbXBlci4gRXRpYW0gbGlndWxhIG9kaW8sIGNvbnZhbGxpcyBub24gcnV0cnVtIG5lYywgZmluaWJ1cyB1dCBleC4gVmVzdGlidWx1bSBwZWxsZW50ZXNxdWUgYWxpcXVldCBqdXN0bywgaWQgbWF4aW11cyBqdXN0byBwdWx2aW5hciBub24uIE9yY2kgdmFyaXVzIG5hdG9xdWUgcGVuYXRpYnVzIGV0IG1hZ25pcyBkaXMgcGFydHVyaWVudCBtb250ZXMsIG5hc2NldHVyIHJpZGljdWx1cyBtdXMuIEN1cmFiaXR1ciBwb3N1ZXJlIG5lYyBvZGlvIGV1IHBvcnR0aXRvci4gUGVsbGVudGVzcXVlIHRlbGx1cyBudWxsYSwgY29uZGltZW50dW0gcXVpcyBhcmN1IHV0LCB2ZW5lbmF0aXMgZWxlbWVudHVtIG51bmMuIE1vcmJpIGNvbmRpbWVudHVtIGFjIGxlY3R1cyBldCBjb25kaW1lbnR1bS4gUGhhc2VsbHVzIGluIGRpY3R1bSBuaWJoLiBDdXJhYml0dXIgc2VkIGxvYm9ydGlzIHZlbGl0LiBDcmFzIGhlbmRyZXJpdCBlcm9zIGluIGVyYXQgZmV1Z2lhdCwgaWQgYWxpcXVldCBlbmltIGdyYXZpZGEuXCJcbiAgfVxuICBiYWNrKCl7XG4gICAgdGhpcy5zaG93UHJpdmFjeVBvbD1mYWxzZVxuICAgIHRoaXMudHZ0ZXh0PScnXG4gIH1cblxuICBvbkZvY3VzTWFpbCgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5waWNTbGlkZVRpbWVyKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5nZW5lcmFsVGltZXIpO1xuICB9XG5cbiAgb25CbHVyTWFpbCgpIHtcbiAgICB0aGlzLnJlc2V0QWxsVGltZXIoKVxuICB9XG5cbiAgaGlkZVNsaWRlcigpIHtcbiAgICB0aGlzLnNob3dTbGlkZSA9IGZhbHNlXG4gICAgdGhpcy5yZXNldEFsbFRpbWVyKClcbiAgfVxuXG4gIG5leHRQaWN0KCkge1xuICAgIHRoaXMucGljdHVyZUFyci5jdXJyZW50ID0gdGhpcy5waWN0dXJlQXJyLmN1cnJlbnQgKyAxXG4gICAgaWYgKHRoaXMucGljdHVyZUFyci5jdXJyZW50ID09IDMpIHtcbiAgICAgIHRoaXMucGljdHVyZUFyci5jdXJyZW50ID0gMFxuICAgIH1cbiAgICB0aGlzLm15SW1hZ2VTb3VyY2UgPSB0aGlzLnBpY3R1cmVBcnIubHN0W3RoaXMucGljdHVyZUFyci5jdXJyZW50XS51cmxcbiAgICB0aGlzLnRpbWVvdXQoKTtcbiAgfVxuXG4gIHJlc2V0QWxsVGltZXIoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucGljU2xpZGVUaW1lcik7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuZ2VuZXJhbFRpbWVyKTtcbiAgICB0aGlzLm9wZW5TbGlkZXJUaW1lZCgzMDAwMClcbiAgfVxuXG4gIHRpbWVvdXQoKSB7XG4gICAgdGhpcy5waWNTbGlkZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLm5leHRQaWN0KClcbiAgICB9LCA1MDAwKTtcbiAgfVxuXG4gIHNob3dTbGlkZXIoKSB7XG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgdGhpcy5zaG93YWN0aW9uYmFyID0gZmFsc2VcbiAgICBpZiAoIXRoaXMuc2hvd1NsaWRlKVxuICAgICAgdGhpcy50aW1lb3V0KClcbiAgICB0aGlzLnNob3dTbGlkZSA9IHRydWVcblxuICB9XG5cbiAgb3BlblNsaWRlclRpbWVkKHRpbWUpIHtcbiAgICBpZiAodGhpcy5zaG93U2xpZGUgPT09IGZhbHNlKVxuICAgICAgdGhpcy5nZW5lcmFsVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zaG93U2xpZGVyKClcbiAgICAgIH0sIHRpbWUpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pbml0aWFsaXplUGljdHVyZSgpXG4gICAgdGhpcy5vcGVuU2xpZGVyVGltZWQoMTAwMDAwKVxuICB9XG59XG4iXX0=