import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Taxi } from '../../models/taxi.model';
import { DataDTO } from '../../services/config.service';

export const AppActions = createActionGroup({
  source: 'APP',
  events: {
    'Error load': props<{ data: DataDTO[] }>(),
    'Success load': props<{ data: DataDTO[] }>(),
    'Load Taxis': emptyProps,
    'Load Commandes': emptyProps,
    'Load Personnes': emptyProps,
  },
});
