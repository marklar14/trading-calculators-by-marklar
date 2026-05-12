import { Routes } from '@angular/router';
import { AppShell } from './core/layout/app-shell/app-shell';

export const routes: Routes = [
  {
    path: '',
    component: AppShell,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'position-size',
        loadComponent: () =>
          import('./features/position-size-calculator/position-size-calculator').then(
            (m) => m.PositionSizeCalculator,
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
  },
];
