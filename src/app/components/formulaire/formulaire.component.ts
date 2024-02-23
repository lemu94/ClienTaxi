import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrl: './formulaire.component.scss',
})
export class FormulaireComponent {
  @Input() Choix = '';
  constructor() {}
}
