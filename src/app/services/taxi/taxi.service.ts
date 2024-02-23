import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Taxi } from '../../models/taxi.model';
import { TaxiApi, url_api } from '../../../config/config';

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
    formData.append('couleurTaxi', Data.CouleurTaxi);
    formData.append('nomTaxi', Data.NomTaxi);
    let Endpoint = url_api + TaxiApi.AjouterTaxi;

    return this.http.post<Taxi>(Endpoint, formData).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  public ListeTaxi(): Observable<Taxi[]> {
    let EndPoint = url_api + TaxiApi.ListeTaxi;
    return this.http.get<Taxi[]>(EndPoint).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  public SupprimerTaxi(IdTaxi: number): Observable<boolean> {
    let EndPoint = url_api + TaxiApi.SupprimerTaxi;
    return this.http.delete<boolean>(EndPoint + '/' + IdTaxi).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  public ModifierTaxi(Data: Taxi): Observable<boolean> {
    let formData = new FormData();
    formData.append('idTaxi', String(Data.IdTaxi));
    formData.append('nomTaxi', Data.NomTaxi);
    formData.append('couleurTaxi', Data.CouleurTaxi);
    let postEndpoint = url_api + TaxiApi.ModifierTaxi;

    return this.http.patch<boolean>(postEndpoint, formData).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}