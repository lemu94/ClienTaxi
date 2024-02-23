import { Injectable } from '@angular/core';

import { DropdownQuestion } from './question-dropdown';

import { TextboxQuestion } from './question-textbox';
import { of } from 'rxjs';
import { QuestionBase } from './question.model';

@Injectable()
export class QuestionService {
  // TODO: get from a remote source of question metadata
  getQuestionsPers() {
    const questions: QuestionBase<string>[] = [
      new TextboxQuestion({
        key: 'NomPers',
        label: 'Nom',
        value: '',
        type: 'text',
        required: true,
        order: 1,
      }),

      new TextboxQuestion({
        key: 'PrenomPers',
        label: 'Prenom',
        type: 'text',
        required: true,
        order: 2,
      }),

      new TextboxQuestion({
        key: 'AgePers',
        label: 'Age',
        type: 'number',
        required: true,
        order: 3,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
  getQuestionsTaxi() {
    const questions: QuestionBase<string>[] = [
      new TextboxQuestion({
        key: 'NomTaxi',
        label: 'Nom Taxi',
        value: '',
        type: 'text',
        required: true,
        order: 2,
      }),

      new TextboxQuestion({
        key: 'CouleurTaxi',
        label: 'Couleur Taxi',
        value: '',
        type: 'text',
        required: true,
        order: 1,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
