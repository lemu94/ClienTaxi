import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Commande } from '../../models/commande.model';
import { Observable, catchError, map } from 'rxjs';
import { TaxiApi, url_api } from '../../../config/config';
import { DataDTO, handleError } from '../config.service';

@Injectable({
  providedIn: 'root',
})
export class CommandeService {
  constructor(private http: HttpClient) {}

  public AjouterCommande(Data: Commande): Observable<DataDTO> {
    let formData = new FormData();
    formData.append('IdPers', String(Data.idPers));
    formData.append('IdTaxi', String(Data.idTaxi));
    let EndPoint = url_api + TaxiApi.AjouterCommande;

    return this.http.post<Commande>(EndPoint, formData).pipe(
      map((commande: Commande) => {
        return {
          id: commande.idCom,
          libelle: commande.dateComm,
        };
      }),
      catchError((error) =>
        handleError(error, { action: 'Ajouter Commande', data: Data })
      )
    );
  }

  public ListeCommande(): Observable<DataDTO[]> {
    let EndPoint = url_api + TaxiApi.ListeCommande;

    return this.http.get<Commande[]>(EndPoint).pipe(
      map((commandes: Commande[]) => {
        return commandes.map((commande) => {
          return {
            id: commande.idCom,
            libelle: commande.dateComm,
          };
        });
      }),
      catchError((error) => handleError(error, { action: 'Liste commande' }))
    );
  }

  public SupprimerCommande(Idcom: number): Observable<Boolean> {
    let EndPoint = url_api + TaxiApi.SupprimerCommande + '?Idcom=' + Idcom;

    return this.http
      .delete<boolean>(EndPoint)
      .pipe(
        catchError((error) =>
          handleError(error, { action: 'Supprimer Commande', data: Idcom })
        )
      );
  }

  public AfficheCommande(Idcom: number): Observable<DataDTO> {
    let EndPoint = url_api + TaxiApi.AfficheCommande + '?Idcom=' + Idcom;

    return this.http.get<Commande>(EndPoint).pipe(
      map((commande: Commande) => {
        return {
          id: commande.idCom,
          libelle: commande.dateComm,
        };
      }),
      catchError((error) =>
        handleError(error, { action: 'Affiche Commande', data: Idcom })
      )
    );
  }

  public ModifierCommande(Data: Commande): Observable<boolean> {
    let formData = new FormData();
    formData.append('IdPers', String(Data.idPers));
    formData.append('IdTaxi', String(Data.idTaxi));
    formData.append('IdCom', String(Data.idCom));
    let EndPoint = url_api + TaxiApi.ModifierCommande;

    return this.http
      .patch<boolean>(EndPoint, formData)
      .pipe(
        catchError((error) =>
          handleError(error, { action: 'Modifier Commande', data: Data })
        )
      );
  }
}
