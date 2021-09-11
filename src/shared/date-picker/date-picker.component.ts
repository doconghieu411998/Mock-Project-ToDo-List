import {AfterViewInit, Component, Injector, Input, OnInit} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: DatePickerComponent,
    multi: true,
  }]
})
export class DatePickerComponent implements OnInit, ControlValueAccessor, AfterViewInit {
  @Input() labelDatePicker: string;
  @Input() required: boolean;
  @Input() max: string;
  @Input() min: string;
  onChange: any;
  onTouch: any;
  datePickerControl = new FormControl(null);
  parentControl: AbstractControl;
  validationMessage: string;
  datePickerValue: any;
  constructor(private injector: Injector) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => this.datePickerControl = this.injector.get(NgControl).control);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(obj: any): void {
    this.datePickerValue = obj;
  }

  handlerValueChange(event: Event) {
    this.onChange(event);
    this.writeValue(event)
  }
}
