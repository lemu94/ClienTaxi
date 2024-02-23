import { Component, EventEmitter, Output } from '@angular/core';
import { Menu } from '../../../config/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() Titre: EventEmitter<string> = new EventEmitter();
  menuItems: string[] = Object.values(Menu);
  constructor() {}

  lien(titre: string) {
    this.Titre.emit(titre);
  }
}
