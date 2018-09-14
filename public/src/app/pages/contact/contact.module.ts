import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {ContactComponent} from './contact.component';

const routes: Routes = [
    {
        path: '',
        component: ContactComponent
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ContactComponent]
})
export class ContactModule {
}
