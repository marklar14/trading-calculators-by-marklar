import { FormControl, FormGroup } from '@angular/forms';
import {
  conditionalRequiredAccountValidator,
  conditionalRequiredRiskAmountValidator,
  differentEntryAndStopLossValidator,
} from './position-size-calculator.validator';
import {
  PositionSizeCalculatorForm,
  PositionSizeCalculatorModel,
} from './position-size-calculator.model';

const createForm = (
  values: Partial<PositionSizeCalculatorModel> = {},
): PositionSizeCalculatorForm =>
  new FormGroup({
    entry: new FormControl(values.entry ?? 100, { nonNullable: true }),
    stopLoss: new FormControl(values.stopLoss ?? 95, { nonNullable: true }),
    riskAmount: new FormControl(values.riskAmount ?? 10, { nonNullable: true }),
    side: new FormControl(values.side ?? 'LONG', { nonNullable: true }),
    units: new FormControl(values.units ?? 'QUANTITY', { nonNullable: true }),
    percentage: new FormControl(values.percentage ?? 0, { nonNullable: true }),
    account: new FormControl(values.account ?? 0, { nonNullable: true }),
    takeProfit: new FormControl(values.takeProfit ?? 0, { nonNullable: true }),
  });

describe('differentEntryAndStopLossValidator', () => {
  it('should return an error when entry and stop loss are the same', () => {
    const form = createForm({ entry: 100, stopLoss: 100 });

    expect(differentEntryAndStopLossValidator(form)).toEqual({
      sameEntryAndStopLoss: true,
    });
  });

  it('should return null when entry and stop loss are different', () => {
    const form = createForm({ entry: 100, stopLoss: 95 });

    expect(differentEntryAndStopLossValidator(form)).toBeNull();
  });
});

describe('conditionalRequiredAccountValidator', () => {
  it('should require account and percentage when units are percentage', () => {
    const form = createForm({ units: 'PERCENTAGE', account: 0, percentage: 0 });

    expect(conditionalRequiredAccountValidator(form)).toEqual({
      requiredAccountRisk: true,
    });
  });

  it('should ignore account when units are fixed amount', () => {
    const form = createForm({ units: 'QUANTITY', account: 0, percentage: 0 });

    expect(conditionalRequiredAccountValidator(form)).toBeNull();
  });
});

describe('conditionalRequiredRiskAmountValidator', () => {
  it('should require risk amount when units are fixed amount', () => {
    const form = createForm({ units: 'QUANTITY', riskAmount: 0 });

    expect(conditionalRequiredRiskAmountValidator(form)).toEqual({
      requiredRiskAmount: true,
    });
  });

  it('should ignore risk amount when units are percentage', () => {
    const form = createForm({ units: 'PERCENTAGE', riskAmount: 0, account: 1000, percentage: 1 });

    expect(conditionalRequiredRiskAmountValidator(form)).toBeNull();
  });
});
