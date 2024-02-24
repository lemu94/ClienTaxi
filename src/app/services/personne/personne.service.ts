import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Personne } from '../../models/personne.model';
import { TaxiApi, url_api } from '../../../config/config';

import { DataDTO, handleError } from '../config.service';

@Injectable({
  providedIn: 'root',
})
export class PersonneService {
  constructor(private http: HttpClient) {}

  public AjouterPersonne(Data: Personne): Observable<DataDTO> {
    let formData = new FormData();
    formData.append('nomPers', Data.NomPers);
    formData.append('prenomPers', Data.PrenomPers);
    formData.append('agePers', String(Data.AgePers));
    let EndPoint = url_api + TaxiApi.AjouterPersonne;

    return this.http.post<Personne>(EndPoint, formData).pipe(
      map((personne: Personne) => {
        return {
          id: personne.IdPers,
          libelle: personne.NomPers,
        };
      }),
      catchError((error) =>
        handleError(error, { action: 'Ajouter personne', data: Data })
      )
    );
  }

  public ListePersonne(): Observable<DataDTO[]> {
    let EndPoint = url_api + TaxiApi.ListePersonne;

    return this.http.get<Personne[]>(EndPoint).pipe(
      map((personnes: Personne[]) => {
        return personnes.map((personne) => {
          return {
            id: personne.IdPers,
            libelle: personne.NomPers + ' - ' + personne.PrenomPers,
          };
        });
      }),
      catchError((error) => handleError(error, { action: 'Liste personne' }))
    );
  }

  public SupprimerPersonne(IdPers: number): Observable<Boolean> {
    let EndPoint = url_api + TaxiApi + '?IdPers=' + IdPers;

    return this.http
      .delete<boolean>(EndPoint)
      .pipe(
        catchError((error) =>
          handleError(error, { action: 'Supprimer personne', data: IdPers })
        )
      );
  }

  public AffichePersonne(IdPers: number): Observable<DataDTO> {
    let EndPoint = url_api + TaxiApi.AffichePersonne + '?IdPers=' + IdPers;

    return this.http.get<Personne>(EndPoint).pipe(
      map((personne: Personne) => {
        return {
          id: personne.IdPers,
          libelle: personne.NomPers,
        };
      }),
      catchError((error) =>
        handleError(error, { action: 'Affiche personne', data: IdPers })
      )
    );
  }

  public ModifierPersonne(Data: Personne): Observable<boolean> {
    let formData = new FormData();
    formData.append('IdPers', String(Data.IdPers));
    formData.append('NomPers', Data.NomPers);
    formData.append('PrenomPers', Data.PrenomPers);

    let EndPoint = url_api + TaxiApi.ModifierPersonne;

    return this.http
      .patch<boolean>(EndPoint, formData)
      .pipe(
        catchError((error) =>
          handleError(error, { action: 'Modifier personne', data: Data })
        )
      );
  }
}
