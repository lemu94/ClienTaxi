import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Action } from '../../../config/config';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrl: './formulaire.component.scss',
})
export class FormulaireComponent implements OnChanges {
  @Input() Choix = '';
  datas: any[] = [];
  constructor(private Store: Store<{ appState: Action }>) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.Store.select('appState').subscribe((donnees) => {
      this.datas = donnees.data.data;
    });
  }
}
