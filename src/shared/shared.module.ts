import {NgModule} from '@angular/core';
import { InputTextComponent } from './input-text/input-text.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { SelectComponent } from './select/select.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule, DatePipe} from '@angular/common';
import { SubmitFormComponent } from './submit-form/submit-form.component';
import { InputSearchComponent } from './input-search/input-search.component';
import { ToastMessageComponent } from './toast-message/toast-message.component';

@NgModule({
  declarations: [InputTextComponent, TextAreaComponent, SelectComponent, DatePickerComponent, SubmitFormComponent, InputSearchComponent, ToastMessageComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    InputTextComponent,
    SelectComponent,
    SubmitFormComponent,
    TextAreaComponent,
    DatePickerComponent,
    InputSearchComponent,
    ToastMessageComponent,
  ],
  providers: [DatePipe]
})

export class SharedModule {

}
