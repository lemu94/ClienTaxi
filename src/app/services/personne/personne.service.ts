import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Personne } from '../../models/personne.model';
import { TaxiApi, url_api } from '../../../config/config';

@Injectable({
  providedIn: 'root',
})
export class PersonneService {
  constructor(private http: HttpClient) {}

  public AjouterPersonne(Data: Personne): Observable<Personne> {
    let formData = new FormData();
    formData.append('nomPers', Data.NomPers);
    formData.append('prenomPers', Data.PrenomPers);
    formData.append('agePers', String(Data.AgePers));
    let EndPoint = url_api + TaxiApi.AjouterPersonne;

    return this.http.post<Personne>(EndPoint, formData).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  public ListePersonne(): Observable<Personne[]> {
    let EndPoint = url_api + TaxiApi.ListePersonne;

    return this.http.get<Personne[]>(EndPoint).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
