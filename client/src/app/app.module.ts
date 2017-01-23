import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {BooksEditorComponent} from './books-editor/books-editor.component';
import {BooksListComponent} from './books-list/books-list.component';


@NgModule({
    declarations: [
        AppComponent,
        BooksEditorComponent,
        BooksListComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    // directives: [ROUTER_DIRECTIVES]
})
export class AppModule {
}
