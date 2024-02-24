import { Component, Input } from '@angular/core';
import { Taxi } from '../../models/taxi.model';
import { Commande } from '../../models/commande.model';
import { DataDTO } from '../../services/config.service';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrl: './element.component.scss',
})
export class ElementComponent {
  @Input() element!: DataDTO;

  constructor() {}
}
