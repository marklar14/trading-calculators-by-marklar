import { DecimalPipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageModule } from 'primeng/message';
import { PositionSizeCalculatorService } from './position-size-calculator.service';
import { PositionSizeCalculatorForm } from './position-size-calculator.model';
import { differentEntryAndStopLossValidator } from './position-size-calculator.validator';

@Component({
  selector: 'app-position-size-calculator',
  imports: [
    DecimalPipe,
    TranslocoPipe,
    ReactiveFormsModule,
    CardModule,
    InputNumberModule,
    MessageModule,
  ],
  templateUrl: './position-size-calculator.html',
  styleUrl: './position-size-calculator.scss',
})
export class PositionSizeCalculator {
  @Input() showHeader = true;
  @Input() compact = false;

  private formBuilder = inject(NonNullableFormBuilder);
  private calculatorService = inject(PositionSizeCalculatorService);

  protected calculatorForm: PositionSizeCalculatorForm = this.formBuilder.group(
    {
      entry: [0, [Validators.required, Validators.min(Number.EPSILON)]],
      stopLoss: [0, [Validators.required, Validators.min(Number.EPSILON)]],
      riskAmount: [0, [Validators.required, Validators.min(Number.EPSILON)]],
    },
    {
      validators: [differentEntryAndStopLossValidator],
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
