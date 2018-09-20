import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../shared/auth/auth.service';
import {ToastrMessageService} from '../../shared/services/toastr-message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SignupFormComponent} from './signup-form/signup-form.component';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    providers: [ToastrMessageService]
})
export class SignupComponent implements OnInit, AfterViewInit {

    @ViewChild(SignupFormComponent) signupFormData;
    model: any;

    constructor(private _authService: AuthService,
                private _router: Router,
                private _toastrMessageService: ToastrMessageService) {
    }

    ngAfterViewInit() {
        this.model = this.signupFormData.signupForm;
    }

    onSubmit() {
        this.signupFormData.onSubmit();
    }

    ngOnInit() {

    }

    signup() {
        if (!this.model.valid) {
            this.onSubmit();
            console.log("Form is invalid!");
            return;
        }
        let data = this.model["controls"];
        debugger;
        const body = {

        };
        this._authService.signupUser(body)
            .subscribe(
                (data: { data: any, response: string, response_message: Array<any> }) => {
                    if (data.response === 'success') {
                        this._toastrMessageService.typeSuccess(data.response_message);
                        this._router.navigate(['/user/login']);
                    }
                },
                (error) => {
                    this._toastrMessageService.typeError(error.error.response_message || error.status_text);
                    this._router.navigate(['/user/signup']);
                });

    }
}
