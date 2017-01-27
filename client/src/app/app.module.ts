import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './books/';
import { ListComponent } from './books/list';
import { EditorComponent } from './books/editor';
import { SessionComponent } from './session/';
import { UsersComponent } from './users/';
import { CreateComponent } from './users/create/';
import { InfoComponent } from './users/info/';

@NgModule({
	declarations: [
		AppComponent,
		BooksComponent,
		ListComponent,
		EditorComponent,
		SessionComponent,
		UsersComponent,
		CreateComponent,
		InfoComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
