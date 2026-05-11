import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { Menu } from '../../../app/core/menu/menu';

@Component({
  selector: 'app-app-shell',
  imports: [RouterOutlet, TranslocoPipe, ButtonModule, ToolbarModule, Menu],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.scss',
})
export class AppShell {}
