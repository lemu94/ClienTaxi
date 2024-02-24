import { createReducer, on } from '@ngrx/store';
import { AppActions } from './apptaxi.action';

export const initialState: Readonly<any> = {
  action: '',
  data: [],
};

export const AppReducer = createReducer(
  initialState,
  on(AppActions.errorLoad, (_state, valeurs) => ({
    action: 'Error',
    data: valeurs,
  })),
  on(AppActions.successLoad, (_state, valeurs) => ({
    action: 'Success',
    data: valeurs,
  }))
);
