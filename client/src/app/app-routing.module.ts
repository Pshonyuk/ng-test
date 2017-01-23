import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksEditorComponent } from './books-editor/books-editor.component';
import { BooksListComponent } from './books-list/books-list.component';

const routes: Routes = [
    {
        path: 'list',
        component: BooksListComponent
    },
    {
        path: 'add',
        component: BooksEditorComponent
    },
    {
        path: 'edit',
        component: BooksEditorComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {
}
