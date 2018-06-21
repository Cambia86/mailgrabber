"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_1 = require("nativescript-angular/platform");
var app_module_1 = require("./app.module");
var application_1 = require("application");
if (application_1.android) {
    application_1.android.on(application_1.AndroidApplication.activityCreatedEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity + ", Bundle: " + args.bundle);
    });
    application_1.android.on(application_1.AndroidApplication.activityDestroyedEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity);
    });
    application_1.android.on(application_1.AndroidApplication.activityStartedEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity);
    });
    application_1.android.on(application_1.AndroidApplication.activityPausedEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity);
        // args['cancel'] = true
    });
    application_1.android.on(application_1.AndroidApplication.activityResumedEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity);
    });
    application_1.android.on(application_1.AndroidApplication.activityStoppedEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity);
    });
    application_1.android.on(application_1.AndroidApplication.saveActivityStateEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity + ", Bundle: " + args.bundle);
    });
    application_1.android.on(application_1.AndroidApplication.activityResultEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity +
            ", requestCode: " + args.requestCode + ", resultCode: " + args.resultCode + ", Intent: " + args.intent);
    });
    application_1.android.on(application_1.AndroidApplication.activityBackPressedEvent, function (args) {
        // console.log("Event: " + args.eventName + ", Activity: " + args.activity);
        args.cancel = true; //to cancel back navigation and do something custom.
    });
}
// applicationOn(launchEvent, (args: ApplicationEventData) => {
//     if (args.android) {
//         // For Android applications, args.android is an android.content.Intent class.
//         console.log("Launched Android application with the following intent: " + args.android + ".");
//     } else if (args.ios !== undefined) {
//         // For iOS applications, args.ios is NSDictionary (launchOptions).
//         console.log("Launched iOS application with options: " + args.ios);
//     }
// });
// applicationOn(suspendEvent, (args: ApplicationEventData) => {
//     if (args.android) {
//         // For Android applications, args.android is an android activity class.
//         // console.log("Activity: " + args.android);
//             // args.cancel = true   //to cancel back navigation and do something custom.
//     } else if (args.ios) {
//         // For iOS applications, args.ios is UIApplication.
//         console.log("UIApplication: " + args.ios);
//     }
// });
// applicationOn(resumeEvent, (args: ApplicationEventData) => {
//     if (args.android) {
//         // For Android applications, args.android is an android activity class.
//         console.log("Activity: " + args.android);
//     } else if (args.ios) {
//         // For iOS applications, args.ios is UIApplication.
//         console.log("UIApplication: " + args.ios);
//     }
// });
// applicationOn(exitEvent, (args: ApplicationEventData) => {
//     if (args.android) {
//         // For Android applications, args.android is an android activity class.
//         console.log("Activity: " + args.android);
//     } else if (args.ios) {
//         // For iOS applications, args.ios is UIApplication.
//         console.log("UIApplication: " + args.ios);
//     }
// });
// applicationOn(lowMemoryEvent, (args: ApplicationEventData) => {
//     if (args.android) {
//         // For Android applications, args.android is an android activity class.
//         console.log("Activity: " + args.android);
//     } else if (args.ios) {
//         // For iOS applications, args.ios is UIApplication.
//         console.log("UIApplication: " + args.ios);
//     }
// });
// applicationOn(uncaughtErrorEvent, (args: ApplicationEventData) => {
//     if (args.android) {
//         // For Android applications, args.android is an NativeScriptError.
//         console.log("NativeScriptError: " + args.android);
//     } else if (args.ios) {
//         // For iOS applications, args.ios is NativeScriptError.
//         console.log("NativeScriptError: " + args.ios);
//     }
// });
platform_1.platformNativeScriptDynamic({ createFrameOnBootstrap: true }).bootstrapModule(app_module_1.AppModule);
