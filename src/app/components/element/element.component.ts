import { Component, Input } from '@angular/core';

import { DataDTO } from '../../shared/services/config.service';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrl: './element.component.scss',
})
export class ElementComponent {
  @Input() element!: DataDTO;

  constructor() {}
}
