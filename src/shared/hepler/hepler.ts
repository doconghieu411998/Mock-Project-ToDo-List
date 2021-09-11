import {AbstractControl} from '@angular/forms';

export function inputValidationMessage(control: AbstractControl): string {
  let validationMessage = null;
  if (control.hasError('required')) {
    validationMessage = 'Please specify a value';
  }
  return  validationMessage;
}
