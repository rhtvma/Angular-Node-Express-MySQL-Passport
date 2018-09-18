import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {SignupRoutingModule} from './signup-routing.module';
import {SignupComponent} from './signup.component';
import {SignupFormComponent} from './signup-form/signup-form.component';

@NgModule({
    imports: [
        CommonModule,
        SignupRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [SignupComponent, SignupFormComponent]
})
export class SignupModule {
}
