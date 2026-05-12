import { FormControl, FormGroup } from '@angular/forms';
import { differentEntryAndStopLossValidator } from './position-size-calculator.validator';
import { PositionSizeCalculatorForm } from './position-size-calculator.model';

describe('differentEntryAndStopLossValidator', () => {
  it('should return an error when entry and stop loss are the same', () => {
    const form: PositionSizeCalculatorForm = new FormGroup({
      entry: new FormControl(100, { nonNullable: true }),
      stopLoss: new FormControl(100, { nonNullable: true }),
      riskAmount: new FormControl(10, { nonNullable: true }),
    });

    expect(differentEntryAndStopLossValidator(form)).toEqual({
      sameEntryAndStopLoss: true,
    });
  });

  it('should return null when entry and stop loss are different', () => {
    const form: PositionSizeCalculatorForm = new FormGroup({
      entry: new FormControl(100, { nonNullable: true }),
      stopLoss: new FormControl(95, { nonNullable: true }),
      riskAmount: new FormControl(10, { nonNullable: true }),
    });

    expect(differentEntryAndStopLossValidator(form)).toBeNull();
  });
});
