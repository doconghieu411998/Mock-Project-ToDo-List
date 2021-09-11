import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ToastMessageService} from '../service/toast-message.service';
import {ToastMessageModel} from '../model/toast-message.model';

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.css']
})
export class ToastMessageComponent implements OnInit {
  @ViewChild('toastContainer', {static: false}) toastContainer: ElementRef;
  toastMessage: ToastMessageModel;
  constructor(private toastService: ToastMessageService) { }

  ngOnInit() {
    this.setToastMessage();
  }

  setToastMessage() {
    this.toastService.toastMessageSubject.subscribe({
      next: resp => {
        if (resp) {
          this.toastMessage = resp;
          if (this.toastContainer.nativeElement.style.display === 'none') {
            this.toastContainer.nativeElement.style.display = 'block';
          }

          setTimeout(() => {
            this.toastContainer.nativeElement.style.display = 'none';
          }, 3000);
        }
      }
    })
  }

}
