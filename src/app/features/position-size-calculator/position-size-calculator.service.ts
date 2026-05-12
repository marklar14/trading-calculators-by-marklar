import { Injectable } from '@angular/core';
import { Calculator } from '../../core/models/calculator';
import { PositionSizeCalculatorModel } from './position-size-calculator.model';

@Injectable({ providedIn: 'root' })
export class PositionSizeCalculatorService implements Calculator<PositionSizeCalculatorModel> {
  calculate(inputs: PositionSizeCalculatorModel): number {
    let riskAmount = inputs.riskAmount;
    if (inputs.units === 'PERCENTAGE') {
      riskAmount = inputs.account * (inputs.percentage / 100);
    }
    return Math.floor(riskAmount / Math.abs(inputs.entry - inputs.stopLoss));
  }
}
