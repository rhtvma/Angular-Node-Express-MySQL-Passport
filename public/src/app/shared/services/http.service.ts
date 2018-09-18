import {HttpClient, HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {NgxSpinnerService} from 'ngx-spinner';
import {Observable} from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class HttpService {
    private secureServerBase: string;
    private headers: HttpHeaders;

    constructor(private _http: HttpClient,
                private _spinner: NgxSpinnerService) {
        this.secureServerBase = environment.serverBase + environment.secureApi;
        this.headers = new HttpHeaders({'Content-Type': 'application/json'});
    }

    get(url): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders()
            .set('Authorization', 'bearer ' + token)
            .set('Content-Type', 'application/json');
        this._spinner.show();
        return this._http.get(this.secureServerBase + url, {headers: headers})
    }

    post(url: String, data: any): Observable<any> {
        this._spinner.show();
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders()
            .set('Authorization', 'bearer ' + token)
            .set('Content-Type', 'application/json');
        const apiEndpoint = `${this.secureServerBase}${environment.secureApi}${url}`;
        console.log(`Reaching endpoint: ${apiEndpoint}`);

        return this._http.post(apiEndpoint, data, {headers: headers});
    };

    put(url: String, data: any): Observable<any> {
        this._spinner.show();
        let token = localStorage.getItem('token');
        const headers = new HttpHeaders()
            .set('Authorization', 'bearer ' + token)
            .set('Content-Type', 'application/json');
        const apiEndpoint = `${this.secureServerBase }${environment.secureApi}${url}`;
        console.log(`Reaching endpoint: ${apiEndpoint}`);

        return this._http.put(apiEndpoint, data, {headers: headers});
    };

    delete(url: String, id: any): Observable<any> {
        this._spinner.show();
        let token = localStorage.getItem('token');
        const headers = new HttpHeaders()
            .set('Authorization', 'bearer ' + token)
            .set('Content-Type', 'application/json');
        const apiEndpoint = `${this.secureServerBase }${environment.secureApi}${url}`;
        console.log(`Reaching endpoint: ${apiEndpoint}`);
        let options = {
            headers: headers
        };
        return this._http.delete(apiEndpoint + "/" + id, options);
    };

}
