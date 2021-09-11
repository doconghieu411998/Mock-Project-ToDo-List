import {AfterViewInit, Component, Injector, Input, OnInit} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: TextAreaComponent
  }]
})
export class TextAreaComponent implements OnInit, ControlValueAccessor, AfterViewInit {
  @Input() textAreaLabel: string;
  @Input() required: boolean;
  @Input() rows = 4;
  @Input() cols = 50;
  onChange: any;
  onTouch: any;
  textAreaControl = new FormControl(null);
  parentControl: AbstractControl;
  validationMessage: string;
  textAreaData: any;
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
    this.textAreaData = obj;
    this.textAreaControl.setValue(this.textAreaData);
  }

  handlerValueChange(event: any) {
    this.onChange(event.target.value);
  }
}
