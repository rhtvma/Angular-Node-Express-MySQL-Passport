import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
// import {AuthService} from '../shared/auth/auth.service';
// import {ToastrService} from '../shared/services/toastr.service';
// import {ActivatedRoute, Router} from '@angular/router';
// import {AuthenticationService, DataService, ToastrService} from '../../_services/index';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

    loginForm: FormGroup;
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
        this.loginForm = new FormGroup({
            email: this.email,
            password: this.password
        });
    }

    onSubmit() {
        console.log('you submitted value: ', this.loginForm.value);
        const formData = this.loginForm["controls"];
        formData['email'].markAsTouched();
        formData['password'].markAsTouched();
    }
}
