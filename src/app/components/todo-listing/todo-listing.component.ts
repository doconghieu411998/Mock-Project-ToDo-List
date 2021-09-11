import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {TodoService} from '../../service/todo.service';
import {ToDoModel} from '../../../shared/model/todo.model';
import {$e} from 'codelyzer/angular/styles/chars';
import {ToastMessageService} from '../../../shared/service/toast-message.service';

@Component({
  selector: 'app-todo-listing',
  templateUrl: './todo-listing.component.html',
  styleUrls: ['./todo-listing.component.css']
})
export class TodoListingComponent implements OnInit, OnDestroy {
  toDoList: ToDoModel[] = [];
  totalRecord: number;

  constructor(
    private toDoService: TodoService,
    private toastService: ToastMessageService
  ) { }

  ngOnInit() {
    this.getToDoList();
    this.getTotalRecord();
  }

  getToDoList() {
    this.toDoService.toDoListingSubject.subscribe({
      next: resp => {
        this.toDoList = [...resp];
      }
    });
  }

  getTotalRecord() {
    this.toDoService.totalRecordSubject.subscribe({
      next: resp => {
        this.totalRecord = resp;
      }
    });
  }

  isExpanded(i, event) {
    if (event.style.display === 'none') {
      event.style.display = 'block';
    } else {
      event.style.display = 'none';
    }
  }

  handlerRemove(id: number) {
    this.toDoService.removeToDo(id);
    this.showToastDeleteSuccess();
  }

  handlerButtonRemove() {
    this.toDoService.actionProgress(true);
    this.showToastDeleteSuccess();
  }

  handlerButtonDone() {
    this.toDoService.actionProgress(false);
    this.showToastUpdateSuccess();
  }

  showBulkAction() {
    const passProgressList = this.toDoList.filter(item => item.progress);
    return passProgressList.length !== 0;
  }

  handlerChecked(event: any, toDo: ToDoModel) {
    toDo.progress = event.target.checked;
    this.toDoService.updateToDo(toDo);
    this.showToastUpdateSuccess();
  }

  onSearch(event: string) {
    this.toDoService.getDataSearch(event);
  }

  showToastUpdateSuccess() {
    this.toastService.setToastMessage({
      title: 'Updated Success',
      content: 'You Updated Successfully'
    });
  }

  showToastDeleteSuccess() {
    this.toastService.setToastMessage({
      title: 'Deleted Success',
      content: 'You Deleted Successfully'
    });
  }

  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }
}
