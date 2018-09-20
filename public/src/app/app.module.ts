import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService} from './shared/auth/auth.service'
import {AuthGuardService} from './shared/auth/auth-guard.service'

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule, // ToastrModule required animations module
        ToastrModule.forRoot(), // ToastrModule added
        FormsModule,
        AppRoutingModule,
        HttpModule,
        HttpClientModule

    ],
    providers: [
        AuthService,
        AuthGuardService,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
