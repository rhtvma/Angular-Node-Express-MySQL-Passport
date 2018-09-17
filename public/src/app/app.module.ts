import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [{
        provide: LocationStrategy,
        useClass: HashLocationStrategy
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
