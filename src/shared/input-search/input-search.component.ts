import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent implements OnInit {

  @Output() searchText = new EventEmitter<string>();
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.generateForm();
  }

  ngOnInit() {
  }

  generateForm() {
    this.formGroup = this.formBuilder.group({
      searchText: new FormControl(null)
    });
  }

  handlerDataOutPut(event: string) {
    this.searchText.emit(event);
  }
}
