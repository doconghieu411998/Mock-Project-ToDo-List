import {Injectable} from '@angular/core';
import {ToastMessageModel} from '../model/toast-message.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {
  toastMessage: ToastMessageModel;
  toastMessageSubject = new BehaviorSubject(this.toastMessage);
  constructor() {
  }

  setToastMessage(toastMessage: ToastMessageModel) {
    this.toastMessageSubject.next(toastMessage);
  }
}
