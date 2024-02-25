import { Component, EventEmitter, Output } from '@angular/core';
import { Menu } from '../../../config/config';
import { Store } from '@ngrx/store';
import { AppActions } from '../../shared/state/apptaxi.action';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() Titre: EventEmitter<Menu> = new EventEmitter();
  menuItems: Menu[] = Object.values(Menu);
  constructor(private store: Store) {}

  lien(titre: Menu) {
    this.Titre.emit(titre);
    switch (titre) {
      case Menu.Personne:
        this.store.dispatch(AppActions.loadPersonnes());
        break;
      case Menu.Taxi:
        this.store.dispatch(AppActions.loadTaxis());

        break;
      case Menu.Commande:
        this.store.dispatch(AppActions.loadCommandes());

        break;
      default:
        this.store.dispatch(AppActions.loadTaxis());
        // Logique à exécuter si aucun des cas précédents ne correspond à la valeur de choix
        break;
    }
  }
}
