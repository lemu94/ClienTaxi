import { Component, Input, OnInit } from '@angular/core';
import { QuestionBase } from '../../shared/dynaminc_form/question.model';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from '../../shared/dynaminc_form/question-control.service';
import { Menu } from '../../../config/config';
import { Taxi } from '../../models/taxi.model';
import { Personne } from '../../models/personne.model';
import { Store } from '@ngrx/store';
import { AppActions } from '../../shared/state/apptaxi.action';
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
        this.Store.dispatch(
          AppActions.addPersonne({ data: this.payLoad as Personne })
        );

        break;
      case Menu.Taxi:
        this.Store.dispatch(AppActions.addTaxi({ data: this.payLoad as Taxi }));

        break;
      case Menu.Commande:
        this.Store.dispatch(
          AppActions.addCommande({ data: this.payLoad as Commande })
        );

        break;
    }
    this.form.reset();
  }
}
