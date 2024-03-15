import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, tap, mergeMap } from 'rxjs/operators';
import { AppActions } from './apptaxi.action';

import { TypeMessage } from '../../../config/config';
import { CommandeService } from '../services/commande/commande.service';
import { notification } from '../services/config.service';
import { PersonneService } from '../services/personne/personne.service';
import { TaxiService } from '../services/taxi/taxi.service';

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

  addTaxis = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.addTaxi),
      tap(() => {
        console.log('newrequest load  in queue');
      }),
      mergeMap((action) => {
        return this.taxiService.AjouterTaxi(action.data).pipe(
          map((res) => AppActions.loadTaxis()),
          catchError((error) => of(AppActions.errorLoad({ data: error }))),
          tap(() => {
            notification(TypeMessage.ADD_SUCCESS);
          })
        );
      })
    )
  );

  addPersonne = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.addPersonne),
      tap(() => {
        console.log('newrequest load in queue');
      }),
      mergeMap((action) => {
        return this.personneService.AjouterPersonne(action.data).pipe(
          map((res) => AppActions.loadPersonnes()),
          catchError((error) => of(AppActions.errorLoad({ data: error }))),
          tap(() => {
            notification(TypeMessage.ADD_SUCCESS);
          })
        );
      })
    )
  );

  addCommande = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.addCommande),
      tap(() => {
        console.log('newrequest load in queue');
      }),
      mergeMap((action) => {
        return this.commandeService.AjouterCommande(action.data).pipe(
          map((res) => AppActions.loadCommandes()),
          catchError((error) => of(AppActions.errorLoad({ data: error }))),
          tap(() => {
            notification(TypeMessage.ADD_SUCCESS);
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
