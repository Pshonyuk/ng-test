import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {BooksComponent} from './books/';
import {ListComponent} from './books/list';
import {EditorComponent} from './books/editor';
import { SessionComponent } from './session/session.component';


@NgModule({
    declarations: [
        AppComponent,
        BooksComponent,
        ListComponent,
        EditorComponent,
        SessionComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
