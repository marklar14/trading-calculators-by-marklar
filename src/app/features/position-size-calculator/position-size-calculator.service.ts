import { Injectable } from '@angular/core';
import { Calculator } from '../../core/models/calculator';
import {
  PositionSizeLeverageOption,
  PositionSizeCalculatorModel,
  PositionSizeCalculatorResult,
  PositionSizeRiskRewardResult,
  RiskRewardRating,
} from './position-size-calculator.model';

@Injectable({ providedIn: 'root' })
export class PositionSizeCalculatorService
  implements Calculator<PositionSizeCalculatorModel, PositionSizeCalculatorResult>
{
  private readonly leveragePresets = [1, 2, 3, 5, 10, 20];

  calculate(inputs: PositionSizeCalculatorModel): PositionSizeCalculatorResult {
    const quantity = this.calculateQuantity(inputs);
    const positionValue = quantity * inputs.entry;
    const leverageOptions = this.calculateLeverageOptions(positionValue);
    const riskReward = this.calculateRiskReward(inputs, quantity);

    return {
      quantity,
      positionValue,
      leverageOptions,
      ...(riskReward ? { riskReward } : {}),
    };
  }

  private calculateQuantity(inputs: PositionSizeCalculatorModel): number {
    let riskAmount = inputs.riskAmount;
    if (inputs.units === 'PERCENTAGE') {
      riskAmount = inputs.account * (inputs.percentage / 100);
    }
    return Math.floor(riskAmount / Math.abs(inputs.entry - inputs.stopLoss));
  }

  private calculateLeverageOptions(positionValue: number): PositionSizeLeverageOption[] {
    return this.leveragePresets.map((leverage) => ({
      leverage,
      requiredMargin: positionValue / leverage,
    }));
  }

  private calculateRiskReward(
    inputs: PositionSizeCalculatorModel,
    quantity: number,
  ): PositionSizeRiskRewardResult | undefined {
    if (inputs.takeProfit <= 0 || quantity <= 0) {
      return undefined;
    }

    const riskPerUnit = Math.abs(inputs.entry - inputs.stopLoss);
    const rewardPerUnit =
      inputs.side === 'LONG' ? inputs.takeProfit - inputs.entry : inputs.entry - inputs.takeProfit;

    if (riskPerUnit <= 0 || rewardPerUnit <= 0) {
      return undefined;
    }

    const ratio = rewardPerUnit / riskPerUnit;

    return {
      ratio,
      potentialProfit: quantity * rewardPerUnit,
      rating: this.getRiskRewardRating(ratio),
    };
  }

  private getRiskRewardRating(ratio: number): RiskRewardRating {
    if (ratio >= 3) {
      return 'IDEAL';
    }

    if (ratio >= 2) {
      return 'GOOD';
    }

    if (ratio >= 1.5) {
      return 'OK';
    }

    if (ratio >= 1) {
      return 'MINIMUM';
    }

    return 'POOR';
  }
}
