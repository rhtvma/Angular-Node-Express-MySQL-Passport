import {Component, OnInit, AfterViewInit} from '@angular/core';
import {test1} from '../../../assets/javascript/demo';
import * as $ from 'jquery';
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {

    constructor() {
    }

    ngOnInit() {
        console.log(test1());
    }

    ngAfterViewInit() {

        $("#menu-close").click(function (e) {
            e.preventDefault();
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("main").style.marginLeft = "0";
        })
    }
}
