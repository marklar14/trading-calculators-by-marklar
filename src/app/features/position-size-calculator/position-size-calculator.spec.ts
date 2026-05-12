import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionSizeCalculator } from './position-size-calculator';
import { translocoTestingModule } from '../../testing/transloco-testing';

describe('PositionSizeCalculator', () => {
  let component: PositionSizeCalculator;
  let fixture: ComponentFixture<PositionSizeCalculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionSizeCalculator, translocoTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PositionSizeCalculator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate position size from form values', () => {
    const calculator = component as unknown as {
      calculatorForm: PositionSizeCalculator['calculatorForm'];
      positionSize: () => number;
    };

    calculator.calculatorForm.setValue({
      entry: 153.52,
      stopLoss: 150.52,
      riskAmount: 15,
      side: 'LONG',
      units: 'QUANTITY',
      percentage: 0,
      account: 0,
    });

    expect(calculator.positionSize()).toBe(5);
  });

  it('should invalidate the form when entry and stop loss are the same', () => {
    const calculator = component as unknown as {
      calculatorForm: PositionSizeCalculator['calculatorForm'];
      isCalculatorValid: () => boolean;
    };

    calculator.calculatorForm.setValue({
      entry: 100,
      stopLoss: 100,
      riskAmount: 10,
      side: 'LONG',
      units: 'QUANTITY',
      percentage: 0,
      account: 0,
    });

    expect(calculator.isCalculatorValid()).toBe(false);
    expect(calculator.calculatorForm.hasError('sameEntryAndStopLoss')).toBe(true);
  });
});
