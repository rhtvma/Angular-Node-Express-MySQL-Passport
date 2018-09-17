import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent, ModelFormComponent} from './login.component';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [LoginComponent, ModelFormComponent]
})
export class LoginModule {
}
