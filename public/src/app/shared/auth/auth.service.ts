import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
    token: string;

    constructor() {
    }

    signupUser(email: string, password: string) {

    }

    signinUser(email: string, password: string) {

    }

    logout() {
        this.token = null;
    }

    getToken() {
        return this.token;
    }

    isAuthenticated() {
        return true;
    }
}
