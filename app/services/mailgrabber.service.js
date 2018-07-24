"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var mailgrabberService = /** @class */ (function () {
    function mailgrabberService() {
        // Observable string sources
        this._mail = '';
    }
    mailgrabberService.prototype.setMail = function (mail) {
        this._mail = mail;
    };
    mailgrabberService.prototype.getMail = function () {
        return this._mail;
    };
    mailgrabberService = __decorate([
        core_1.Injectable()
    ], mailgrabberService);
    return mailgrabberService;
}());
exports.mailgrabberService = mailgrabberService;
