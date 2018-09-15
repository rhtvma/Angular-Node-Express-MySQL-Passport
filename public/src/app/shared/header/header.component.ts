import {Component, OnInit, AfterViewInit} from '@angular/core';
import * as $ from 'jquery';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {

    constructor() {
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        // $(function () {
        //     $("#menu-toggle").click(function (e) {
        //         e.preventDefault();
        //         $("#wrapper").toggleClass("toggled");
        //         // document.getElementById("sidebar").style.width = "0";
        //         document.getElementById("main-page").style.marginLeft = "25";
        //     });
        // })


        $("#menu-click").click(function (e) {
            e.preventDefault();
            document.getElementById("mySidenav").style.width = "250px";
            document.getElementById("main").style.marginLeft = "250px";
        })
    }

}
