import {Component, ContentChildren, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TodoService} from '../../app/service/todo.service';
import {ToDoModel} from '../model/todo.model';
import {DatePipe} from '@angular/common';
import {PiorityEnum} from '../enum/piority.enum';
import {ToastMessageService} from '../service/toast-message.service';

@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.css']
})
export class SubmitFormComponent implements OnInit {
  @Input() isAddNew: boolean;
  @Input() isUpdate: boolean;
  @ContentChildren('dataContent') someElement;
  constructor(
    private toDoService: TodoService,
    private datePipe: DatePipe,
    private toastService: ToastMessageService
  ) { }

  ngOnInit() {
  }

  enteredAddNew() {
    const formGroup = this.someElement.last.formGroup as FormGroup;
    if (formGroup.invalid) {
      formGroup.markAllAsTouched();
      return;
    }
    const toDo: ToDoModel = formGroup.getRawValue();
    Object.assign(toDo, {id: Math.random()});
    this.toDoService.addNewToDo(toDo);
    formGroup.reset({
      dueDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      piority: PiorityEnum.NORMAL
    });
    this.toastService.setToastMessage({
      title: 'Created Success',
      content: 'You Created Successfully'
    });
  }

  enteredUpdate() {
    const formGroup = this.someElement.last.formGroup as FormGroup;
    if (formGroup.invalid) {
      formGroup.markAllAsTouched();
      return;
    }
    const toDo: ToDoModel = formGroup.getRawValue();
    this.toDoService.updateToDo(toDo);
    this.toastService.setToastMessage({
      title: 'Updated Success',
      content: 'You Updated Successfully'
    });
  }
}
