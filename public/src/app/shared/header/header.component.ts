import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(private _authService: AuthService,
                private _router: Router) {
    }

    ngOnInit() {
        this.userName();
    }

    userName(): string {
        const userName = this._authService.getUserInfo();
        return userName['first_name'];
    }

    logout() {
        this._authService.logout();
        this._router.navigate(['/user/login']);
    }
}
