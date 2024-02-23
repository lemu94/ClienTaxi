import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Personne } from '../../models/personne.model';
import { TaxiApi, url_api } from '../../../config/config';

import { handleError } from '../config.service';

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

    return this.http
      .post<Personne>(EndPoint, formData)
      .pipe(catchError((error) => handleError(error, 'Ajouter personne')));
  }

  public ListePersonne(): Observable<Personne[]> {
    let EndPoint = url_api + TaxiApi.ListePersonne;

    return this.http
      .get<Personne[]>(EndPoint)
      .pipe(catchError((error) => handleError(error, 'Liste personne')));
  }

  public SupprimerPersonne(IdPers: number): Observable<Boolean> {
    let EndPoint = url_api + TaxiApi + '?IdPers=' + IdPers;

    return this.http
      .delete<boolean>(EndPoint)
      .pipe(catchError((error) => handleError(error, 'Supprimer personne')));
  }

  public AffichePersonne(IdPers: number): Observable<Personne> {
    let EndPoint = url_api + TaxiApi.AffichePersonne + '?IdPers=' + IdPers;

    return this.http
      .get<Personne>(EndPoint)
      .pipe(catchError((error) => handleError(error, 'Affiche personne')));
  }

  public ModifierPersonne(Data: Personne): Observable<boolean> {
    let formData = new FormData();
    formData.append('IdPers', String(Data.IdPers));
    formData.append('NomPers', Data.NomPers);
    formData.append('PrenomPers', Data.PrenomPers);

    let EndPoint = url_api + TaxiApi.ModifierPersonne;

    return this.http
      .patch<boolean>(EndPoint, formData)
      .pipe(catchError((error) => handleError(error, 'Modifier personne')));
  }
}
