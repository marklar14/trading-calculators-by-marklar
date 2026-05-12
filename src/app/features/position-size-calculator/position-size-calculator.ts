import { DecimalPipe } from '@angular/common';
import { Component, Input, inject, input } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageModule } from 'primeng/message';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PositionSizeCalculatorService } from './position-size-calculator.service';
import { PositionSizeCalculatorForm } from './position-size-calculator.model';
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
    if (!this.isCalculatorValid()) {
      return 0;
    }

    return this.calculatorService.calculate(this.calculatorForm.getRawValue());
  }
}
