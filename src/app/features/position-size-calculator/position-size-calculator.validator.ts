import { AbstractControl, ValidationErrors } from '@angular/forms';
import { PositionSizeCalculatorModel } from './position-size-calculator.model';
import { isValidNumber } from '../../shared/utils/utils';

export function differentEntryAndStopLossValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const { entry, stopLoss } = control.getRawValue() as PositionSizeCalculatorModel;

  return entry === stopLoss ? { sameEntryAndStopLoss: true } : null;
}

export function conditionalRequiredAccountValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const { units, account, percentage } = control.getRawValue() as PositionSizeCalculatorModel;
  return units === 'PERCENTAGE' && (!isValidNumber(account) || !isValidNumber(percentage))
    ? { requiredAccountRisk: true }
    : null;
}

export function conditionalRequiredRiskAmountValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const { units, riskAmount } = control.getRawValue() as PositionSizeCalculatorModel;
  return units === 'QUANTITY' && !isValidNumber(riskAmount)
    ? { requiredRiskAmount: true }
    : null;
}
