import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from './shared/auth/auth-guard.service';
const routes: Routes = [
    {
        path: '',
        loadChildren: './pages/pages.module#PagesModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'user',
        loadChildren: './user/user.module#UserModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
