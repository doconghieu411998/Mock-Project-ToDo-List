import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToDoModel} from '../../../shared/model/todo.model';
import {SelectItemModel} from '../../../shared/model/select-item.model';
import {PiorityEnum, PiorityLabels} from '../../../shared/enum/piority.enum';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-todo-info',
  templateUrl: './todo-info.component.html',
  styleUrls: ['./todo-info.component.css']
})
export class TodoInfoComponent implements OnInit, OnChanges {
  @Input() toDo: ToDoModel;
  formGroup: FormGroup;
  piorityOption: SelectItemModel[] = [];
  minDate = this.datePipe.transform(new Date(),'yyyy-MM-dd');
  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
  ) {
    this.generateForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('toDo') && changes.toDo.currentValue) {
      const toDo: ToDoModel = changes.toDo.currentValue;
      this.formGroup.patchValue(toDo);
    }
  }

  ngOnInit() {
    this.setPiorityOption();
  }

  generateForm() {
    this.formGroup = this.formBuilder.group({
      id: new FormControl(null),
      taskName: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      dueDate: new FormControl(this.datePipe.transform(new Date(), 'yyyy-MM-dd'),  [Validators.required]),
      piority: new FormControl(PiorityEnum.NORMAL, [Validators.required]),
      progress: new FormControl(false, ),
    });
  }

  setPiorityOption() {
    this.piorityOption = [
      {id: PiorityEnum.LƠW, itemName: PiorityLabels[PiorityEnum.LƠW]},
      {id: PiorityEnum.NORMAL, itemName: PiorityLabels[PiorityEnum.NORMAL]},
      {id: PiorityEnum.HIGH, itemName: PiorityLabels[PiorityEnum.HIGH]},
    ];
  }

}
