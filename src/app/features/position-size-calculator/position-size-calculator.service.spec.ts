import { TestBed } from '@angular/core/testing';
import { PositionSizeCalculatorService } from './position-size-calculator.service';

describe('PositionSizeCalculatorService', () => {
  let service: PositionSizeCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PositionSizeCalculatorService);
  });

  it('should calculate whole position size from risk and price distance', () => {
    const result = service.calculate({
      entry: 153.52,
      stopLoss: 150.52,
      riskAmount: 15,
      side: 'LONG',
      units: 'QUANTITY',
      percentage: 0,
      account: 0,
    });

    expect(result).toBe(5);
  });

  it('should round position size down', () => {
    const result = service.calculate({
      entry: 82_000,
      stopLoss: 80_000,
      riskAmount: 10,
      side: 'LONG',
      units: 'QUANTITY',
      percentage: 0,
      account: 0,
    });

    expect(result).toBe(0);
  });

  it('should use absolute price distance', () => {
    const result = service.calculate({
      entry: 150.52,
      stopLoss: 153.52,
      riskAmount: 15,
      side: 'SHORT',
      units: 'QUANTITY',
      percentage: 0,
      account: 0,
    });

    expect(result).toBe(5);
  });
});
