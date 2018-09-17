import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'model-form',
    templateUrl: './login.form.html',
    styleUrls: ['./login.component.css']
})
export class ModelFormComponent implements OnInit {

    myform: FormGroup;
    email: FormControl;
    password: FormControl;

    ngOnInit() {
        this.createFormControls();
        this.createForm();
    }

    createFormControls() {
        this.email = new FormControl('', [
            Validators.required,
            Validators.pattern("[^ @]*@[^ @]*")
        ]);
        this.password = new FormControl('', [
            Validators.required,
            Validators.minLength(8)
        ]);
    }

    createForm() {
        this.myform = new FormGroup({
            email: this.email,
            password: this.password
        });
    }
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, AfterViewInit {

    @ViewChild(ModelFormComponent) loginFormData;
    loginForm: any;

    constructor() {
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        debugger;
        this.loginForm = this.loginFormData;
    }

}