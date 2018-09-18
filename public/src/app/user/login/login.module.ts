import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {LoginFormComponent} from './login-form/login-form.component';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [LoginComponent, LoginFormComponent]
})
export class LoginModule {
}
