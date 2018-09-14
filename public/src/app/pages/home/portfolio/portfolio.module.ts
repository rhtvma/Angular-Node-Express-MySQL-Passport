import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PortfolioComponent} from './portfolio.component';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: "",
        component: PortfolioComponent
    }
]
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [PortfolioComponent]
})
export class PortfolioModule {
}
