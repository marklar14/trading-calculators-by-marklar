import { AbstractControl, ValidationErrors } from '@angular/forms';
import { PositionSizeCalculatorModel } from './position-size-calculator.model';

export function differentEntryAndStopLossValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const { entry, stopLoss } = control.getRawValue() as PositionSizeCalculatorModel;

  return entry === stopLoss ? { sameEntryAndStopLoss: true } : null;
}
