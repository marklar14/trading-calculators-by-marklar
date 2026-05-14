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
  takeProfit: number;
}

export type PositionSizeCalculatorForm = FormGroup<{
  entry: FormControl<number>;
  stopLoss: FormControl<number>;
  riskAmount: FormControl<number>;
  side: FormControl<Side>;
  units: FormControl<Units>;
  percentage: FormControl<number>;
  account: FormControl<number>;
  takeProfit: FormControl<number>;
}>;

export type RiskRewardRating = 'POOR' | 'MINIMUM' | 'OK' | 'GOOD' | 'IDEAL';

export interface PositionSizeRiskRewardResult {
  ratio: number;
  potentialProfit: number;
  rating: RiskRewardRating;
}

export interface PositionSizeLeverageOption {
  leverage: number;
  requiredMargin: number;
}

export interface PositionSizeCalculatorResult {
  quantity: number;
  positionValue: number;
  leverageOptions: PositionSizeLeverageOption[];
  riskReward?: PositionSizeRiskRewardResult;
}
