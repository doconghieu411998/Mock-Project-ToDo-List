import {AfterViewInit, Component, Injector, Input, OnInit} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';
import {SelectItemModel} from '../model/select-item.model';
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SelectComponent,
    multi: true
  }]
})
export class SelectComponent implements OnInit, ControlValueAccessor, AfterViewInit {
  @Input() labelSelect: string;
  @Input() required: boolean;
  @Input() selectOptions: SelectItemModel[];
  @Input() id = 'id';
  onChange: any;
  onTouch: any;
  selectControl = new FormControl(null);
  parentControl: AbstractControl;
  validationMessage: string;
  selectData: any;
  constructor(private injector: Injector) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => this.parentControl = this.injector.get(NgControl).control);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(obj: any): void {
    this.selectData = obj;
    this.selectControl.setValue(this.selectData);
  }

  handlerValueChange(event: any) {
    this.onChange(event);
  }
}
