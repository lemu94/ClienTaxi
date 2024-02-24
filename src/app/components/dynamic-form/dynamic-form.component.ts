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
import { Store } from '@ngrx/store';
import { AppActions } from '../../shared/state/apptaxi.action';
import { CommandeService } from '../../services/commande/commande.service';
import { Commande } from '../../models/commande.model';
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
    private PersonneService: PersonneService,
    private CommandeService: CommandeService,
    private Store: Store<{ appState: any }>
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
              this.form.reset();
              this.Store.dispatch(AppActions.loadCommandes());
            }
          },
          complete: () => {},
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
              this.Store.dispatch(AppActions.loadTaxis());
            }
          },
          error: (err) => console.error(err),
        });
        break;
      case Menu.Commande:
        this.CommandeService.AjouterCommande(
          this.payLoad as Commande
        ).subscribe({
          next: (data) => {
            if (data == null) {
              notification(TypeMessage.ADD_ERROR);
            } else {
              notification(TypeMessage.ADD_SUCCESS);
              this.Store.dispatch(AppActions.loadCommandes());
            }
          },
          error: (err) => console.error(err),
        });
        break;
      default:
        // Logique à exécuter si aucun des cas précédents ne correspond à la valeur de choix
        break;
    }
  }
}
