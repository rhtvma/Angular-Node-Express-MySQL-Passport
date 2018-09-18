import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService} from './shared/auth/auth.service'
import {AuthGuardService} from './shared/auth/auth-guard.service'

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,
        HttpModule,
        HttpClientModule,
        ToastModule.forRoot()
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
