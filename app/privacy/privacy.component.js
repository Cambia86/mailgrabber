"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
// @Component({
//     selector: "first",
//     template: `
//         <StackLayout>
//             <Label text="First component" class="title"></Label>
//             <Button text="GO TO SECOND" [nsRouterLink]="['/second']" class="link"></Button>
//         </StackLayout>
//     `
// })
// export class FirstComponent { }
// @Component({
//     selector: "second",
//     template: `
//         <StackLayout>
//             <Label text="Second component" class="title"></Label>
//             <Button text="GO TO FIRST" [nsRouterLink]="['/first']" class="link"></Button>
//         </StackLayout>
//     `
// })
// export class SecondComponent { }
var PrivacyComponent = /** @class */ (function () {
    function PrivacyComponent(router) {
        this.router = router;
        this.tvtext = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quam nulla, commodo eget gravida sed, tristique sed ante. Mauris auctor, lorem id tincidunt tempor, velit nunc pharetra dolor, at ullamcorper nisl erat in eros. Sed tincidunt elit ac augue ultrices, aliquet pretium orci cursus. Aliquam semper sagittis magna sit amet semper. Etiam ligula odio, convallis non rutrum nec, finibus ut ex. Vestibulum pellentesque aliquet justo, id maximus justo pulvinar non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur posuere nec odio eu porttitor. Pellentesque tellus nulla, condimentum quis arcu ut, venenatis elementum nunc. Morbi condimentum ac lectus et condimentum. Phasellus in dictum nibh. Curabitur sed lobortis velit. Cras hendrerit eros in erat feugiat, id aliquet enim gravida.";
    }
    PrivacyComponent.prototype.back = function () {
        this.router.navigate(["/home"]);
    };
    PrivacyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "privacy-app",
            templateUrl: './privacy.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], PrivacyComponent);
    return PrivacyComponent;
}());
exports.PrivacyComponent = PrivacyComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmFjeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcml2YWN5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQywwQ0FBeUU7QUFDekUsZUFBZTtBQUNmLHlCQUF5QjtBQUN6QixrQkFBa0I7QUFDbEIsd0JBQXdCO0FBQ3hCLG1FQUFtRTtBQUNuRSw4RkFBOEY7QUFDOUYseUJBQXlCO0FBQ3pCLFFBQVE7QUFDUixLQUFLO0FBQ0wsa0NBQWtDO0FBRWxDLGVBQWU7QUFDZiwwQkFBMEI7QUFDMUIsa0JBQWtCO0FBQ2xCLHdCQUF3QjtBQUN4QixvRUFBb0U7QUFDcEUsNEZBQTRGO0FBQzVGLHlCQUF5QjtBQUN6QixRQUFRO0FBQ1IsS0FBSztBQUNMLG1DQUFtQztBQVlqQztJQUdFLDBCQUFvQixNQUFhO1FBQWIsV0FBTSxHQUFOLE1BQU0sQ0FBTztRQUYxQixXQUFNLEdBQUMsdTBCQUF1MEIsQ0FBQTtJQUlyMUIsQ0FBQztJQUVELCtCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQVRVLGdCQUFnQjtRQVI5QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFdBQVcsRUFBRSwwQkFBMEI7U0FDeEMsQ0FBQzt5Q0FPMkIsZUFBTTtPQUh0QixnQkFBZ0IsQ0FVNUI7SUFBRCx1QkFBQztDQUFBLEFBVkQsSUFVQztBQVZZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25TdGFydCwgTmF2aWdhdGlvbkVuZCB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbi8vIEBDb21wb25lbnQoe1xuLy8gICAgIHNlbGVjdG9yOiBcImZpcnN0XCIsXG4vLyAgICAgdGVtcGxhdGU6IGBcbi8vICAgICAgICAgPFN0YWNrTGF5b3V0PlxuLy8gICAgICAgICAgICAgPExhYmVsIHRleHQ9XCJGaXJzdCBjb21wb25lbnRcIiBjbGFzcz1cInRpdGxlXCI+PC9MYWJlbD5cbi8vICAgICAgICAgICAgIDxCdXR0b24gdGV4dD1cIkdPIFRPIFNFQ09ORFwiIFtuc1JvdXRlckxpbmtdPVwiWycvc2Vjb25kJ11cIiBjbGFzcz1cImxpbmtcIj48L0J1dHRvbj5cbi8vICAgICAgICAgPC9TdGFja0xheW91dD5cbi8vICAgICBgXG4vLyB9KVxuLy8gZXhwb3J0IGNsYXNzIEZpcnN0Q29tcG9uZW50IHsgfVxuXG4vLyBAQ29tcG9uZW50KHtcbi8vICAgICBzZWxlY3RvcjogXCJzZWNvbmRcIixcbi8vICAgICB0ZW1wbGF0ZTogYFxuLy8gICAgICAgICA8U3RhY2tMYXlvdXQ+XG4vLyAgICAgICAgICAgICA8TGFiZWwgdGV4dD1cIlNlY29uZCBjb21wb25lbnRcIiBjbGFzcz1cInRpdGxlXCI+PC9MYWJlbD5cbi8vICAgICAgICAgICAgIDxCdXR0b24gdGV4dD1cIkdPIFRPIEZJUlNUXCIgW25zUm91dGVyTGlua109XCJbJy9maXJzdCddXCIgY2xhc3M9XCJsaW5rXCI+PC9CdXR0b24+XG4vLyAgICAgICAgIDwvU3RhY2tMYXlvdXQ+XG4vLyAgICAgYFxuLy8gfSlcbi8vIGV4cG9ydCBjbGFzcyBTZWNvbmRDb21wb25lbnQgeyB9XG5cblxuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiBcInByaXZhY3ktYXBwXCIsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3ByaXZhY3kuY29tcG9uZW50Lmh0bWwnXG4gIH0pXG4gIFxuICBcbiAgXG4gIGV4cG9ydCBjbGFzcyBQcml2YWN5Q29tcG9uZW50IHtcbiAgICBwdWJsaWMgdHZ0ZXh0PVwiTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4gQWVuZWFuIHF1YW0gbnVsbGEsIGNvbW1vZG8gZWdldCBncmF2aWRhIHNlZCwgdHJpc3RpcXVlIHNlZCBhbnRlLiBNYXVyaXMgYXVjdG9yLCBsb3JlbSBpZCB0aW5jaWR1bnQgdGVtcG9yLCB2ZWxpdCBudW5jIHBoYXJldHJhIGRvbG9yLCBhdCB1bGxhbWNvcnBlciBuaXNsIGVyYXQgaW4gZXJvcy4gU2VkIHRpbmNpZHVudCBlbGl0IGFjIGF1Z3VlIHVsdHJpY2VzLCBhbGlxdWV0IHByZXRpdW0gb3JjaSBjdXJzdXMuIEFsaXF1YW0gc2VtcGVyIHNhZ2l0dGlzIG1hZ25hIHNpdCBhbWV0IHNlbXBlci4gRXRpYW0gbGlndWxhIG9kaW8sIGNvbnZhbGxpcyBub24gcnV0cnVtIG5lYywgZmluaWJ1cyB1dCBleC4gVmVzdGlidWx1bSBwZWxsZW50ZXNxdWUgYWxpcXVldCBqdXN0bywgaWQgbWF4aW11cyBqdXN0byBwdWx2aW5hciBub24uIE9yY2kgdmFyaXVzIG5hdG9xdWUgcGVuYXRpYnVzIGV0IG1hZ25pcyBkaXMgcGFydHVyaWVudCBtb250ZXMsIG5hc2NldHVyIHJpZGljdWx1cyBtdXMuIEN1cmFiaXR1ciBwb3N1ZXJlIG5lYyBvZGlvIGV1IHBvcnR0aXRvci4gUGVsbGVudGVzcXVlIHRlbGx1cyBudWxsYSwgY29uZGltZW50dW0gcXVpcyBhcmN1IHV0LCB2ZW5lbmF0aXMgZWxlbWVudHVtIG51bmMuIE1vcmJpIGNvbmRpbWVudHVtIGFjIGxlY3R1cyBldCBjb25kaW1lbnR1bS4gUGhhc2VsbHVzIGluIGRpY3R1bSBuaWJoLiBDdXJhYml0dXIgc2VkIGxvYm9ydGlzIHZlbGl0LiBDcmFzIGhlbmRyZXJpdCBlcm9zIGluIGVyYXQgZmV1Z2lhdCwgaWQgYWxpcXVldCBlbmltIGdyYXZpZGEuXCJcbiAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6Um91dGVyKXtcblxuICAgIH1cblxuICAgIGJhY2soKXtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2hvbWVcIl0pXG4gICAgfVxuICB9Il19