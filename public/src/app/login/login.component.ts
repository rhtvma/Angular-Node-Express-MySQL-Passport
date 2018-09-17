import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ToastrService} from '../shared/services/toastr.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
    selector: 'login-form',
    templateUrl: './login.form.html',
    styleUrls: ['./login.component.css']
})
export class LoginFormComponent implements OnInit {

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
            Validators.minLength(5)
        ]);
    }

    createForm() {
        this.myform = new FormGroup({
            email: this.email,
            password: this.password
        });
    }

    onSubmit() {
        console.log('you submitted value: ', this.myform.value);
        const formData = this.myform["controls"];
        formData['email'].markAsTouched();
        formData['password'].markAsTouched();
    }

}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [ToastrService]
})

export class LoginComponent implements OnInit, AfterViewInit {

    @ViewChild(LoginFormComponent) loginFormData;//Sharing data from one component to another
    model: any;

    constructor(private router: Router,
                private _toastrService: ToastrService) {
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.model = this.loginFormData.myform;
    }

    onSubmit() {
        this.loginFormData.onSubmit();

    }

    login() {
        if (!this.model.valid) {
            this.onSubmit();
            this._toastrService.typeError(`Form is invalid!`);
            return;
        } else {
            this._toastrService.typeSuccess(`Form is valid!`);
        }
        //Login API call here
    }
}