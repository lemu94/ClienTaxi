import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Taxi } from '../../models/taxi.model';
import { TaxiApi, url_api } from '../../../config/config';
import { handleError } from '../config.service';

interface ITaxiService {
  AjouterTaxi(Data: Taxi): Observable<Taxi>;
  ListeTaxi(): Observable<Taxi[]>;
  SupprimerTaxi(IdTaxi: number): Observable<boolean>;
  ModifierTaxi(Data: Taxi): Observable<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class TaxiService implements ITaxiService {
  constructor(private http: HttpClient) {}

  public AjouterTaxi(Data: Taxi): Observable<Taxi> {
    let formData = new FormData();
    formData.append('couleurTaxi', Data.couleurTaxi);
    formData.append('nomTaxi', Data.nomTaxi);
    let Endpoint = url_api + TaxiApi.AjouterTaxi;

    return this.http
      .post<Taxi>(Endpoint, formData)
      .pipe(
        catchError((error) =>
          handleError(error, { action: 'Ajouter Taxi', data: Data })
        )
      );
  }

  public ListeTaxi(): Observable<Taxi[]> {
    let EndPoint = url_api + TaxiApi.ListeTaxi;
    return this.http
      .get<Taxi[]>(EndPoint)
      .pipe(
        catchError((error) => handleError(error, { action: 'Liste Taxi' }))
      );
  }

  public SupprimerTaxi(IdTaxi: number): Observable<boolean> {
    let EndPoint = url_api + TaxiApi.SupprimerTaxi;
    return this.http
      .delete<boolean>(EndPoint + '/' + IdTaxi)
      .pipe(
        catchError((error) =>
          handleError(error, { action: 'Supprimer Taxi', data: IdTaxi })
        )
      );
  }

  public ModifierTaxi(Data: Taxi): Observable<boolean> {
    let formData = new FormData();
    formData.append('idTaxi', String(Data.idTaxi));
    formData.append('nomTaxi', Data.nomTaxi);
    formData.append('couleurTaxi', Data.couleurTaxi);
    let postEndpoint = url_api + TaxiApi.ModifierTaxi;

    return this.http
      .patch<boolean>(postEndpoint, formData)
      .pipe(
        catchError((error) =>
          handleError(error, { action: 'Modifier Taxi', data: Data })
        )
      );
  }

  public AfficheTaxi(IdTaxi: number): Observable<Taxi> {
    let EndPoint = url_api + TaxiApi.AfficheTaxi + '?IdTaxi=' + IdTaxi;
    return this.http
      .get<Taxi>(EndPoint)
      .pipe(
        catchError((error) =>
          handleError(error, { action: 'Afficher Taxi', data: IdTaxi })
        )
      );
  }
}
