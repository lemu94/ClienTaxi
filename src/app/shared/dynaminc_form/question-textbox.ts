import { QuestionBase } from './question.model';

export class TextboxQuestion extends QuestionBase<string> {
  override controlType = 'textbox';
}
