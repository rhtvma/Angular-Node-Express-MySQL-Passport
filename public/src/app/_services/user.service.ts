import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import{map} from 'rxjs/operators';

import{User} from '../_models';
import { LoginResultModel } from '../_models';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    RestUrl='http://localhost:8080/';

    getAll() {
        return this.http.get<User[]>(`apii/register.php`);
    }

    login(login) {
        debugger;
        let body = JSON.stringify(login);
        return this.http.post(this.RestUrl+'apii/login.php', body);
        //console.log(login);
    }

   
    // getUsername(){
    //   return JSON.parse(localStorage.getItem('currentUser')).email;
    //  }

    register(user){
        debugger;
        let body = JSON.stringify(user);
        return this.http.post(this.RestUrl+'apii/register.php', body);
        //console.log(user);
   
      }

    update(user: User) {
            return this.http.put(`/users/` , user);
        }
    
    delete(id: number) {
            return this.http.delete(`/users/` + id);
        }
    }