import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageModule } from 'primeng/message';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PositionSizeCalculatorService } from './position-size-calculator.service';
import {
  PositionSizeCalculatorForm,
  PositionSizeCalculatorResult,
  RiskRewardRating,
} from './position-size-calculator.model';
import {
  conditionalRequiredAccountValidator,
  conditionalRequiredRiskAmountValidator,
  differentEntryAndStopLossValidator,
} from './position-size-calculator.validator';
import { Side } from '../../shared/models/side';
import { Units } from '../../shared/models/units';

@Component({
  selector: 'app-position-size-calculator',
  imports: [
    DecimalPipe,
    CurrencyPipe,
    TranslocoPipe,
    ReactiveFormsModule,
    CardModule,
    InputNumberModule,
    MessageModule,
    RadioButtonModule,
  ],
  templateUrl: './position-size-calculator.html',
  styleUrl: './position-size-calculator.scss',
})
export class PositionSizeCalculator {
  showHeader = input<boolean>(true);
  compact = input<boolean>(false);

  protected readonly inputStyleClass =
    'w-full min-h-11 rounded-lg border border-solid border-[var(--p-content-border-color)] bg-white px-3 py-2.5 text-slate-950 caret-cyan-600 outline-none transition-shadow focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20';

  private formBuilder = inject(NonNullableFormBuilder);
  private calculatorService = inject(PositionSizeCalculatorService);

  protected calculatorForm: PositionSizeCalculatorForm = this.formBuilder.group(
    {
      entry: [0, [Validators.required, Validators.min(Number.EPSILON)]],
      stopLoss: [0, [Validators.required, Validators.min(Number.EPSILON)]],
      riskAmount: [0],
      side: ['LONG' as Side, [Validators.required]],
      units: ['QUANTITY' as Units, [Validators.required]],
      percentage: [0],
      account: [0],
      takeProfit: [0],
    },
    {
      validators: [
        differentEntryAndStopLossValidator,
        conditionalRequiredAccountValidator,
        conditionalRequiredRiskAmountValidator,
      ],
    },
  );

  protected isCalculatorValid(): boolean {
    return this.calculatorForm.valid;
  }

  protected positionSize(): number {
    return this.calculatorResult().quantity;
  }

  protected positionValue(): number {
    return this.calculatorResult().positionValue;
  }

  protected calculatorResult(): PositionSizeCalculatorResult {
    if (!this.isCalculatorValid()) {
      return {
        quantity: 0,
        positionValue: 0,
        leverageOptions: [],
      };
    }

    return this.calculatorService.calculate(this.calculatorForm.getRawValue());
  }

  protected riskRewardRatingClass(rating: RiskRewardRating): string {
    const baseClass = 'rounded-full px-3 py-1 text-xs font-bold uppercase tracking-normal';

    const ratingClass: Record<RiskRewardRating, string> = {
      POOR: 'bg-red-500/20 text-red-200 ring-1 ring-red-400/50',
      MINIMUM: 'bg-amber-500/20 text-amber-100 ring-1 ring-amber-400/50',
      OK: 'bg-sky-500/20 text-sky-100 ring-1 ring-sky-400/50',
      GOOD: 'bg-emerald-500/20 text-emerald-100 ring-1 ring-emerald-400/50',
      IDEAL: 'bg-cyan-500/20 text-cyan-100 ring-1 ring-cyan-300/60',
    };

    return `${baseClass} ${ratingClass[rating]}`;
  }
}
