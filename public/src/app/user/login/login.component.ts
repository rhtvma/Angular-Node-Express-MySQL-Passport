import {Component, OnInit, ViewChild, AfterViewInit, OnDestroy, AfterContentChecked} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../shared/auth/auth.service';
import {ToastrMessageService} from '../../shared/services/toastr-message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginFormComponent} from './login-form/login-form.component';
import {Observable} from 'rxjs'
import {catchError, map, tap} from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [ToastrMessageService]
})

export class LoginComponent implements OnInit, AfterViewInit, OnDestroy, AfterContentChecked {

    @ViewChild(LoginFormComponent) loginFormData;
    model: any;

    constructor(private _authService: AuthService,
                private router: Router,
                private _toastrMessageService: ToastrMessageService) {
    }

    ngOnInit() {
        setTimeout(() => {
            this._toastrMessageService.clearToast();
            this._toastrMessageService.dismissToastOnClick(`Username: 12345@gmail.com, Password: 12345`, `Credentials`);
        })

        if (this._authService.isLoggedIn()) {
            this.router.navigate(['home']);
        }
    }

    ngAfterViewInit() {
        this.model = this.loginFormData.loginForm;
    }

    ngAfterContentChecked() {

    }

    onSubmit() {
        this.loginFormData.onSubmit();
    }

    ngOnDestroy() {
        // this._toastrService.clearToast();
    }

    login(): void {
        if (!this.model.valid) {
            this.onSubmit();
            console.log("Form is invalid!");
            return;
        }
        if (this._authService.isLoggedIn()) {
            this.router.navigate(['home']);
            return;
        } else {
            let data = this.model["controls"];
            debugger;
            this._authService.signinUser(data.email.value, data.password.value)
                .subscribe(
                    (data: { data: any, response: string, response_message: Array<any> }) => {
                        if (data.response === 'success') {
                            this._toastrMessageService.typeSuccess(data.response_message);
                            this.router.navigate(['home']);
                        }
                    },
                    (error) => {
                        this._toastrMessageService.typeError(error.error.response_message || error.status_text);
                        this.router.navigate(['/user/login']);
                    });
        }
    }
}