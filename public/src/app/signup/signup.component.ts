import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../shared/auth/auth.service';
import {ToastrService} from '../shared/services/toastr.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    constructor(private _authService: AuthService,
                private _router: Router) {
    }

    ngOnInit() {
        if (this._authService.isLoggedIn()) {
            this._router.navigate(['home']);
        }
    }
}
