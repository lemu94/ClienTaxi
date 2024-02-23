import { QuestionBase } from './question.model';

export class DropdownQuestion extends QuestionBase<string> {
  override controlType = 'dropdown';
}
