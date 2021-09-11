import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoInfoComponent } from './components/todo-info/todo-info.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import { TodoAddNewComponent } from './components/todo-add-new/todo-add-new.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodoListingComponent } from './components/todo-listing/todo-listing.component';
import {HttpClientModule} from '@angular/common/http';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    TodoInfoComponent,
    TodoAddNewComponent,
    TodoComponent,
    TodoListingComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  exports: [
    TodoInfoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
