import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionBase } from '../../shared/dynaminc_form/question.model';
import { QuestionService } from '../../shared/dynaminc_form/question.service';
import { Menu } from '../../../config/config';

@Component({
  selector: 'app-champs',
  templateUrl: './champs.component.html',
  styleUrl: './champs.component.scss',
})
export class ChampsComponent implements OnChanges {
  questions1!: Observable<QuestionBase<any>[]>;
  questions2!: Observable<QuestionBase<any>[]>;
  questions3!: Observable<QuestionBase<any>[]>;
  menuItems: string[] = Object.values(Menu);
  temoin: number = 0;
  @Input() Choix = '';
  constructor(public service: QuestionService) {
    this.questions1 = this.service.getQuestionsPers();
    this.questions2 = this.service.getQuestionsTaxi();
  }

  ngOnChanges(changes: SimpleChanges): void {
    switch (this.Choix) {
      case Menu.Personne:
        this.temoin = 0;
        break;
      case Menu.Taxi:
        this.temoin = 1;
        break;
      case Menu.Commande:
        // Logique à exécuter lorsque choix est 'Commande'
        this.temoin = 2;
        break;
      default:
        // Logique à exécuter si aucun des cas précédents ne correspond à la valeur de choix
        break;
    }
  }
}
