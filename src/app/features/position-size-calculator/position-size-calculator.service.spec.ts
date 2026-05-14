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
      takeProfit: 0,
    });

    expect(result.quantity).toBe(5);
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
      takeProfit: 0,
    });

    expect(result.quantity).toBe(0);
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
      takeProfit: 0,
    });

    expect(result.quantity).toBe(5);
  });

  it('should calculate position value from rounded position size and entry', () => {
    const result = service.calculate({
      entry: 2.1414,
      stopLoss: 2.1224,
      riskAmount: 2,
      side: 'LONG',
      units: 'QUANTITY',
      percentage: 0,
      account: 0,
      takeProfit: 0,
    });

    expect(result.positionValue).toBeCloseTo(224.847);
  });

  it('should calculate required margin for leverage presets', () => {
    const result = service.calculate({
      entry: 2.1414,
      stopLoss: 2.1224,
      riskAmount: 2,
      side: 'LONG',
      units: 'QUANTITY',
      percentage: 0,
      account: 0,
      takeProfit: 0,
    });

    expect(result.leverageOptions).toEqual([
      { leverage: 1, requiredMargin: 224.847 },
      { leverage: 2, requiredMargin: 112.4235 },
      { leverage: 3, requiredMargin: 74.949 },
      { leverage: 5, requiredMargin: 44.9694 },
      { leverage: 10, requiredMargin: 22.4847 },
      { leverage: 20, requiredMargin: 11.24235 },
    ]);
  });

  it('should calculate risk reward result for a long take profit', () => {
    const result = service.calculate({
      entry: 2.14,
      stopLoss: 2.12,
      riskAmount: 2,
      side: 'LONG',
      units: 'QUANTITY',
      percentage: 0,
      account: 0,
      takeProfit: 2.18,
    });

    expect(result.quantity).toBe(99);
    expect(result.positionValue).toBeCloseTo(211.86);
    expect(result.riskReward?.ratio).toBeCloseTo(2);
    expect(result.riskReward?.potentialProfit).toBeCloseTo(3.96);
    expect(result.riskReward?.rating).toBe('GOOD');
  });

  it('should calculate risk reward result for a short take profit', () => {
    const result = service.calculate({
      entry: 2.12,
      stopLoss: 2.14,
      riskAmount: 2,
      side: 'SHORT',
      units: 'QUANTITY',
      percentage: 0,
      account: 0,
      takeProfit: 2.08,
    });

    expect(result.riskReward?.ratio).toBeCloseTo(2);
    expect(result.riskReward?.rating).toBe('GOOD');
  });

  it('should omit risk reward when take profit is empty', () => {
    const result = service.calculate({
      entry: 2.14,
      stopLoss: 2.12,
      riskAmount: 2,
      side: 'LONG',
      units: 'QUANTITY',
      percentage: 0,
      account: 0,
      takeProfit: 0,
    });

    expect(result.riskReward).toBeUndefined();
  });
});
