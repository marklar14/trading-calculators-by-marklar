import { Injectable } from '@angular/core';
import { Calculator } from '../../core/models/calculator';
import { PositionSizeCalculatorModel } from './position-size-calculator.model';

@Injectable({ providedIn: 'root' })
export class PositionSizeCalculatorService implements Calculator<PositionSizeCalculatorModel> {
  calculate(inputs: PositionSizeCalculatorModel): number {
    return Math.floor(inputs.riskAmount / Math.abs(inputs.entry - inputs.stopLoss));
  }
}
