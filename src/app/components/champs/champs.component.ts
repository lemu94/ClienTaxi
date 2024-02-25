import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionBase } from '../../shared/dynaminc_form/question.model';
import { QuestionService } from '../../shared/dynaminc_form/question.service';
import { Menu } from '../../../config/config';

@Component({
  selector: 'app-champs',
  templateUrl: './champs.component.html',
  styleUrl: './champs.component.scss',
})
export class ChampsComponent {
  questionsTaxi!: Observable<QuestionBase<any>[]>;
  questionsPers!: Observable<QuestionBase<any>[]>;
  questionsComm!: Observable<QuestionBase<any>[]>;
  @Input() Choix!: Menu;
  constructor(public service: QuestionService) {
    this.questionsTaxi = this.service.choixQuestion(Menu.Taxi);
    this.questionsPers = this.service.choixQuestion(Menu.Personne);
    this.questionsComm = this.service.choixQuestion(Menu.Commande);
  }
}
