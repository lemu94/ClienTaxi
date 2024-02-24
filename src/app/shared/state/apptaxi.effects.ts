import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, tap, mergeMap } from 'rxjs/operators';
import { AppActions } from './apptaxi.action';
import { TaxiService } from '../../services/taxi/taxi.service';
import { PersonneService } from '../../services/personne/personne.service';
import { CommandeService } from '../../services/commande/commande.service';

@Injectable()
export class AppEffects {
  loadTaxis = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadTaxis),
      tap(() => {
        console.log('newrequest load taxis in queue');
      }),
      mergeMap((action) => {
        return this.taxiService.ListeTaxi().pipe(
          map((res) => AppActions.successLoad({ data: res })),
          catchError((error) => of(AppActions.errorLoad({ data: error }))),
          tap(() => {
            console.log('get load taxis Finished');
          })
        );
      })
    )
  );

  loadPersonnes = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadPersonnes),
      tap(() => {
        console.log('new request load Personnes in Queue');
      }),
      mergeMap((action) => {
        return this.personneService.ListePersonne().pipe(
          map((res) => AppActions.successLoad({ data: res })),
          catchError((error) => of(AppActions.errorLoad({ data: error }))),
          tap(() => {
            console.log('get load Personnes Finished');
          })
        );
      })
    )
  );

  loadCommandes = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadCommandes),
      tap(() => {
        console.log('new request load Commandes in Queue');
      }),
      mergeMap((action) => {
        return this.commandeService.ListeCommande().pipe(
          map((res) => AppActions.successLoad({ data: res })),
          catchError((error) => of(AppActions.errorLoad({ data: error }))),
          tap(() => {
            console.log('get load Commandes Finished');
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private taxiService: TaxiService,
    private personneService: PersonneService,
    private commandeService: CommandeService
  ) {}
}
