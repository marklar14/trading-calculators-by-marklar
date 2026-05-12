import { FormControl, FormGroup } from '@angular/forms';
import { Side } from '../../shared/models/side';
import { Units } from '../../shared/models/units';

export interface PositionSizeCalculatorModel {
  riskAmount: number;
  stopLoss: number;
  entry: number;
  side: Side;
  units: Units;
  percentage: number;
  account: number;
}

export type PositionSizeCalculatorForm = FormGroup<{
  entry: FormControl<number>;
  stopLoss: FormControl<number>;
  riskAmount: FormControl<number>;
  side: FormControl<Side>;
  units: FormControl<Units>;
  percentage: FormControl<number>;
  account: FormControl<number>;
}>;
