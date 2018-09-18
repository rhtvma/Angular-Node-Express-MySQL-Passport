import {Component, ViewContainerRef} from '@angular/core';
// import {ToastsManager} from 'ng2-toastr';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    // private viewContainerRef: ViewContainerRef;

    public constructor(){}

    //     public constructor(public toastr: ToastsManager, viewContainerRef: ViewContainerRef) {
    //     // You need this small hack in order to catch application root view container ref (ng2-bootstrap)
    //     this.viewContainerRef = viewContainerRef;
    //     this.toastr.setRootViewContainerRef(viewContainerRef);
    // }

}
