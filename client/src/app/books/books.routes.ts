import {Routes} from '@angular/router';
import {BooksComponent} from './books.component';
import {ListComponent} from './list';
import {EditorComponent} from './editor';

export const booksRoutes: Routes = [
    {
        path: 'books',
        component: BooksComponent,
        children: [
            {
                path: 'list',
                component: ListComponent
            },
            {
                path: 'add',
                component: EditorComponent,
                data: {
                    action: 'add'
                }
            },
            {
                path: 'edit',
                component: EditorComponent,
                data: {
                    action: 'edit'
                }
            }
        ]
    }
];
