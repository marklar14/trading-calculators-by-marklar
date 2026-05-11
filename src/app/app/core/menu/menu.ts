import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive, TranslocoPipe],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {}
