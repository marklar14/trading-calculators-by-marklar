import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-dashboard',
  imports: [TranslocoPipe, CardModule, TagModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
