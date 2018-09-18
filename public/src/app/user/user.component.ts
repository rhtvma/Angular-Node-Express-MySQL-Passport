import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    constructor(private _authService: AuthService, private _router: Router) {
    }

    ngOnInit() {
        if (this._authService.isLoggedIn()) {
            this._router.navigate(['home']);
        }
    }

}
