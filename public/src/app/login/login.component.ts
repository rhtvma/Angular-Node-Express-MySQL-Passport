import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../shared/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
// import {AuthenticationService, DataService, ToastrService} from '../../_services/index';

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

    onSubmit() {
        console.log('you submitted value: ', this.myform.value);
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
    model: any;

    constructor(private _authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        debugger;
        this.model = this.loginFormData.myform;
    }

    onSubmit() {
        this.loginFormData.onSubmit();
        // const formData = this.model.controls.userFormDetails["controls"];
        // formData['internal_tcm_id'].markAsTouched(true);
        // formData['name'].markAsTouched(true);
    }

    login() {
        debugger;
        if (!this.model.valid) {
            this.onSubmit();
            console.log("Form is invalid!");
            return;
        }
        if (this._authService.isLoggedIn()) {
            this.router.navigate(['products']);
            return;
        } else {
            this._authService.signinUser(this.model.email, this.model.password)
                .subscribe(
                    (data: { data: any, response: string, response_message: Array<any> }) => {
                        if (data.response === 'success') {
                            // this._toastrService.typeSuccess(data.response_message);
                            this.router.navigate(['products']);
                        }
                    },
                    (error) => {
                        // this._toastrService.typeError(error.error.response_message || error.status_text);
                        this.router.navigate(['login']);
                    });
        }
    }
}