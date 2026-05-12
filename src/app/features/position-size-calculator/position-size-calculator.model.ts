import { FormControl, FormGroup } from '@angular/forms';

export interface PositionSizeCalculatorModel {
  riskAmount: number;
  stopLoss: number;
  entry: number;
}

export type PositionSizeCalculatorForm = FormGroup<{
  entry: FormControl<number>;
  stopLoss: FormControl<number>;
  riskAmount: FormControl<number>;
}>;
