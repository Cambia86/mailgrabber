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
var userRegistration = /** @class */ (function () {
    // FlagPrivacy: number
    function userRegistration(mail, flagPrivacy) {
        this.Mail = mail;
        // this.FlagPrivacy = flagPrivacy
    }
    return userRegistration;
}());
exports.userRegistration = userRegistration;
var AppComponent = /** @class */ (function () {
    function AppComponent(page, vcRef, modal) {
        this.page = page;
        this.vcRef = vcRef;
        this.modal = modal;
        this.showactionbar = false;
        page.actionBarHidden = true;
        this.people = [];
    }
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
    AppComponent.prototype.onDoubleTap = function (args) {
        this.showModalGender();
    };
    AppComponent.prototype.ngOnInit = function () {
    };
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
