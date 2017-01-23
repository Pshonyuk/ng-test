import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {booksRoutes} from './books';
import {SessionComponent} from './session';

const routes: Routes = [
    {
        path: '',
        component: SessionComponent
    },
    ...booksRoutes
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {
}
