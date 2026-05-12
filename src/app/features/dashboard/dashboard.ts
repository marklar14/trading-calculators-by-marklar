import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { PositionSizeCalculator } from '../position-size-calculator/position-size-calculator';

@Component({
  selector: 'app-dashboard',
  imports: [TranslocoPipe, PositionSizeCalculator],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
