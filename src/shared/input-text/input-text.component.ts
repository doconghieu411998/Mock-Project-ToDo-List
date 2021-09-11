import {AfterViewInit, Component, DoCheck, EventEmitter, Injector, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';
import {inputValidationMessage} from '../hepler/hepler';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputTextComponent,
    multi: true
  }]
})
export class InputTextComponent implements OnInit, ControlValueAccessor, AfterViewInit, DoCheck {

  @Input() labelInputText: string;
  @Input() required: boolean;
  @Input() placeholder: string;

  @Output() inputTextOutPut = new EventEmitter<string>();
  onChange: any;
  onTouch: any;
  inputControl = new FormControl(null);
  parentControl: AbstractControl;
  validationMessage: string;
  inputData: any;
  constructor(private injector: Injector) { }

  ngOnInit() {
  }

  ngDoCheck(): void {
    if (this.parentControl && this.parentControl.invalid && this.parentControl.hasError) {
      this.validationMessage = inputValidationMessage(this.parentControl);
    }
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
    this.inputData = obj;
    this.inputControl.setValue(this.inputData);
  }

  handlerValueChange(event) {
    this.onChange(event.target.value);
    this.inputTextOutPut.emit(event.target.value);
    this.parentControl.markAsTouched();
  }
}
