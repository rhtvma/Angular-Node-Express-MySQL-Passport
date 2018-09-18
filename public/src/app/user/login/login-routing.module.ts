import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login.component';
import {AuthService} from '../../shared/auth/auth.service'

const routes: Routes = [
    {path: '', component: LoginComponent}
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthService]
})
export class LoginRoutingModule {
}
