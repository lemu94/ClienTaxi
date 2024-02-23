import { Component } from '@angular/core';
import { Menu } from '../config/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ClienTaxi';
  TitreFormulaire: string = Menu.Taxi;
  constructor() {}

  recup(titre: string) {
    this.TitreFormulaire = titre;
  }
}
