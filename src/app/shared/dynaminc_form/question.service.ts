import { Injectable } from '@angular/core';

import { DropdownQuestion } from './question-dropdown';

import { TextboxQuestion } from './question-textbox';
import { of } from 'rxjs';
import { QuestionBase } from './question.model';

@Injectable()
export class QuestionService {
  // TODO: get from a remote source of question metadata

  getQuestionComm() {
    const questions: QuestionBase<string>[] = [
      new DropdownQuestion({
        key: 'idPers',
        label: 'Personne',
        options: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' },
        ],
        order: 1,
        required: true,
      }),

      new DropdownQuestion({
        key: 'idTaxi',
        label: 'Taxi',
        options: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' },
        ],
        order: 2,
        required: true,
      }),
    ];
    return of(questions.sort((a, b) => a.order - b.order));
  }

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
        key: 'nomTaxi',
        label: 'Nom Taxi',
        value: '',
        type: 'text',
        required: true,
        order: 2,
      }),

      new TextboxQuestion({
        key: 'couleurTaxi',
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
