import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
    token: string;
    serverPath: string;
    serverBase: string;

    constructor(private _http: HttpClient) {
        this.serverPath = environment.serverBase + environment.inSecureApi;
        this.serverBase = environment.serverBase;
    }

    signupUser(email: string, password: string) {

    }

    signinUser(username: string, password: string) {
        const body = {
            'username': username,
            'password': password
        };
        const options = {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
        };
        return this._http.post <any>(
            this.serverPath + '/login',
            body,
            options
        ).map(
            (data: { data: any, response: string, response_message: Array<any> }) => {
                if (data.response === 'success') {
                    if (data && data.data) {
                        localStorage.setItem('token', data.data);
                    }
                    return data;
                }
            })
            .catch(error => Observable.throw(error || 'Internal server error')
            );
    }

    isLoggedIn(): boolean {
        const isLoggedIn = localStorage.getItem('token');
        return (isLoggedIn ? true : false);
    }

    logout() {
        if (this.isLoggedIn()) {
            localStorage.removeItem('token');
            const options = {
                headers: new HttpHeaders()
                    .set('Authorization', 'bearer ' + this.getToken())
                    .set('Content-Type', 'application/json')
            };
            return this._http.get(
                this.serverBase + '/auth/logout',
                options
            ).map(response => {
                if (response) {
                    return response;
                }
            }).catch(this._errorHandler);
        }
        localStorage.removeItem('token');
        this.token = null;
    }

    getUserInfo() {
        const userToken = this.getToken();
        if (userToken) {
            let payload = userToken.split('.')[1];
            payload = atob(payload);
            payload = JSON.parse(payload);
            return payload;
        }
        return false;
    }

    getRole(): string {
        const userInfo = this.getUserInfo();
        if (userInfo) {
            return userInfo['role'] || '';
        } else {
            return null;
        }
    }

    getToken() {
        return this.token;
    }

    isAuthenticated() {
        return true;
    }

    _errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error || 'Internal server error');
    }
}
