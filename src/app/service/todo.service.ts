import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ToDoModel} from '../../shared/model/todo.model';
import {StorageProvider} from '../../shared/provider/storage-provider';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  toDoList: ToDoModel[] = [];
  totalRecord: number;
  toDoListingSubject = new BehaviorSubject<any>(this.toDoList);
  totalRecordSubject = new BehaviorSubject<number>(this.totalRecord);
  localStorageKey = 'ToDo';
  textSearch: string;
  constructor(
    private httpClient: HttpClient,
    private localStorage: StorageProvider
  ) {
    this.getToDoListing();
  }

  getToDoListing() {
    const toDoList: ToDoModel[] =  this.localStorage.loadRetrieve(this.localStorageKey);
    this.toDoList = (toDoList && toDoList.length) ? toDoList : [];
    this.toDoListingSubject.next(this.toDoList);
    this.totalRecordSubject.next(this.toDoList.length);
  }

  addNewToDo(toDo: ToDoModel) {
    let toDoList: ToDoModel[] =  this.localStorage.loadRetrieve(this.localStorageKey);
    if (!toDoList) {
      toDoList = [];
    }
    toDoList.unshift(toDo);
    this.stepAddMultipleRecordToLocalStorage(toDoList, 'C');
  }

  updateToDo(toDo: ToDoModel) {
    const toDoList: ToDoModel[] =  this.localStorage.loadRetrieve(this.localStorageKey);
    const foundIndex = toDoList.findIndex(item => item.id === toDo.id);
    toDoList[foundIndex] = toDo;
    this.stepAddMultipleRecordToLocalStorage(toDoList);
  }

  removeToDo(id: number) {
    this.toDoList = this.toDoList.filter(item => item.id !== id);
    this.localStorage.localStorageRemove(this.localStorageKey);
    this.localStorage.localStorage(this.localStorageKey, this.toDoList);
    this.getToDoListing();
    this.refreshToDoList();
  }

  actionProgress(action: boolean) {
    const toDoList: ToDoModel[] =  this.localStorage.loadRetrieve(this.localStorageKey);
    this.toDoList.forEach((item: ToDoModel) => {
      if (action && item.progress) {
        item.progress = false;
      }

      if (!action && !item.progress) {
        item.progress = true;
      }
      const foundIndex = toDoList.findIndex(toDo => toDo.id === item.id);
      toDoList[foundIndex] = item;
    });
    this.stepAddMultipleRecordToLocalStorage(toDoList);
  }

  refreshToDoList() {
    if (this.toDoList.length > 1) {
      this.toDoList.sort((a, b) => {
        return a.dueDate.localeCompare(b.dueDate);
      });
    }
    this.toDoListingSubject.next(this.toDoList);
  }

  getDataSearch(textSearch) {
    this.getToDoListing();
    if (textSearch === undefined || !textSearch.trim()) {
      this.refreshToDoList();
      this.textSearch = '';
      return;
    }
    this.textSearch = textSearch;
    this.toDoList = this.toDoList.filter(item => item.taskName.toLocaleUpperCase().indexOf(textSearch.toLocaleUpperCase()) > -1);
    this.refreshToDoList();
  }

  sortByDate(items: ToDoModel[]) {
    items.sort((a, b) => {
      return a.dueDate.localeCompare(b.dueDate);
    });
    return items;
  }

  stepAddMultipleRecordToLocalStorage(toDoList: ToDoModel[], actionType?: string) {
    if (toDoList.length) {
      if (toDoList.length > 1) {
        toDoList = this.sortByDate(toDoList);
      }
      if (!actionType && actionType !== 'C') {
        this.localStorage.localStorageRemove(this.localStorageKey);
      }
      this.localStorage.localStorage(this.localStorageKey, toDoList);
      this.getDataSearch(this.textSearch);
    }
  }
}
