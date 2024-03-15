import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Taxi } from '../models/taxi.model';

import { Commande } from '../models/commande.model';
import { Personne } from '../models/personne.model';
import { DataDTO } from '../services/config.service';

export const AppActions = createActionGroup({
  source: 'APP',
  events: {
    'Add Taxi': props<{ data: Taxi }>(),
    'Add Commande': props<{ data: Commande }>(),
    'Add Personne': props<{ data: Personne }>(),
    'Error load': props<{ data: DataDTO[] }>(),
    'Success load': props<{ data: DataDTO[] }>(),
    'Load Taxis': emptyProps,
    'Load Commandes': emptyProps,
    'Load Personnes': emptyProps,
  },
});
