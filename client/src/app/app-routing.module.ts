import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { booksRoutes } from './books';

const routes: Routes = [
    ...booksRoutes
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {
}
