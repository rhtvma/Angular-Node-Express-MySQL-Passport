import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../shared/auth/auth.service';
// import {ToastrService} from '../../shared/services/toastr.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SignupFormComponent} from './signup-form/signup-form.component';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, AfterViewInit {

    @ViewChild(SignupFormComponent) signupFormData;
    model: any;

    constructor(private _authService: AuthService,
                private _router: Router) {
    }

    ngAfterViewInit() {
        this.model = this.signupFormData.signupForm;
    }

    onSubmit() {
        this.signupFormData.onSubmit();
    }

    ngOnInit() {

    }
}
