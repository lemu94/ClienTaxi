import { Component, Input, OnInit } from '@angular/core';
import { QuestionBase } from '../../shared/dynaminc_form/question.model';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from '../../shared/dynaminc_form/question-control.service';
import { Menu, TypeMessage } from '../../../config/config';
import { TaxiService } from '../../services/taxi/taxi.service';
import { Taxi } from '../../models/taxi.model';
import { notification } from '../../services/config.service';
import { PersonneService } from '../../services/personne/personne.service';
import { Personne } from '../../models/personne.model';

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
    private TaxiService: TaxiService,
    private PersonneService: PersonneService
  ) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    this.payLoad = JSON.parse(this.payLoad);
    switch (this.Choix) {
      case Menu.Personne:
        this.PersonneService.AjouterPersonne(
          this.payLoad as Personne
        ).subscribe({
          next: (data) => {
            if (data == null) {
              notification(TypeMessage.ADD_ERROR);
            } else {
              notification(TypeMessage.ADD_SUCCESS);
            }
          },
          error: (err) => console.error(err),
        });
        break;
      case Menu.Taxi:
        this.TaxiService.AjouterTaxi(this.payLoad as Taxi).subscribe({
          next: (data) => {
            if (data == null) {
              notification(TypeMessage.ADD_ERROR);
            } else {
              notification(TypeMessage.ADD_SUCCESS);
            }
          },
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
