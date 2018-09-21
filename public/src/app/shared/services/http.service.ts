import {HttpClient, HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {NgxSpinnerService} from 'ngx-spinner';
import {Observable} from 'rxjs'
import {catchError, map, tap} from 'rxjs/operators';


@Injectable()
export class HttpService {
    private serverBase: string;

    constructor(private _http: HttpClient,
                private _spinner: NgxSpinnerService) {
        this.serverBase = environment.serverBase;
    }

    get(url): Observable<any> {
        this._spinner.show();
        return this._http.get(this.serverBase + url, {})
    }

    post(url: String, data: any): Observable<any> {
        this._spinner.show();
        debugger;
        const apiEndpoint = `${this.serverBase}${url}`;
        console.log(`Reaching endpoint: ${apiEndpoint}`);
        return this._http.post(apiEndpoint, data, {});
    };

    put(url: String, data: any): Observable<any> {
        this._spinner.show();
       const apiEndpoint = `${this.serverBase}${url}`;
        console.log(`Reaching endpoint: ${apiEndpoint}`);

        return this._http.put(apiEndpoint, data, {});
    };

    delete(url: String, id: any): Observable<any> {
        this._spinner.show();
        // let token = localStorage.getItem('token');
        // const headers = new HttpHeaders()
        //     .set('Authorization', 'bearer ' + token)
        //     .set('Content-Type', 'application/json');
       const apiEndpoint = `${this.serverBase}${url}`;
        console.log(`Reaching endpoint: ${apiEndpoint}`);
        let options = {
            // headers: headers
        };
        return this._http.delete(apiEndpoint + "/" + id, options);
    };

}
