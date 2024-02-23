import { Component, Input, OnInit } from '@angular/core';
import { QuestionBase } from '../../shared/dynaminc_form/question.model';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from '../../shared/dynaminc_form/question-control.service';
import { Menu } from '../../../config/config';
import { TaxiService } from '../../services/taxi/taxi.service';
import { Taxi } from '../../models/taxi.model';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<string>[] | null = [];
  @Input() Choix = '';
  form!: FormGroup;
  payLoad!: any;

  constructor(
    private qcs: QuestionControlService,
    private TaxiService: TaxiService
  ) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
  }

  listData() {}

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    this.payLoad = JSON.parse(this.payLoad);
    switch (this.Choix) {
      case Menu.Personne:
        // this.temoin = 0;
        break;
      case Menu.Taxi:
        this.TaxiService.AjouterTaxi(this.payLoad as Taxi).subscribe({
          next: () => this.form.reset(),
          error: (err) => console.error(err),
        });
        break;
      case Menu.Commande:
        break;
      default:
        // Logique à exécuter si aucun des cas précédents ne correspond à la valeur de choix
        break;
    }
  }
}
