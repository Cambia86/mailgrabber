import { Component } from "@angular/core";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
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



@Component({
    moduleId: module.id,
    selector: "privacy-app",
    templateUrl: './privacy.component.html'
  })
  
  
  
  export class PrivacyComponent {
    public tvtext="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quam nulla, commodo eget gravida sed, tristique sed ante. Mauris auctor, lorem id tincidunt tempor, velit nunc pharetra dolor, at ullamcorper nisl erat in eros. Sed tincidunt elit ac augue ultrices, aliquet pretium orci cursus. Aliquam semper sagittis magna sit amet semper. Etiam ligula odio, convallis non rutrum nec, finibus ut ex. Vestibulum pellentesque aliquet justo, id maximus justo pulvinar non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur posuere nec odio eu porttitor. Pellentesque tellus nulla, condimentum quis arcu ut, venenatis elementum nunc. Morbi condimentum ac lectus et condimentum. Phasellus in dictum nibh. Curabitur sed lobortis velit. Cras hendrerit eros in erat feugiat, id aliquet enim gravida."
  
    constructor(private router:Router){

    }

    back(){
        this.router.navigate(["/home"])
    }
  }