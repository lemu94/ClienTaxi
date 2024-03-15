import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

import Swal from 'sweetalert2';
import { Action, TypeMessage } from '../../../config/config';

export function handleError(error: HttpErrorResponse, action: Action) {
  if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error(
      'An error occurred on action ' +
        action.action +
        ' and on Data ' +
        JSON.stringify(action.data),
      error.error
    );
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, action was ${
        action.action
      } Data was ${JSON.stringify(action.data)} , body was: `,
      error.error
    );
  }
  // Return an observable with a user-facing error message.
  return throwError(
    () => new Error('Something bad happened; please try again later.')
  );
}

export function notification(type: TypeMessage) {
  switch (type) {
    case TypeMessage.ADD_SUCCESS:
      Swal.fire({
        icon: 'success',
        title: 'Confirmation',
        text: 'Ajout effectué',
      });
      break;
    case TypeMessage.ADD_ERROR:
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ajout Echoué',
      });
      break;
    case TypeMessage.DEL_ERROR:
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Suppression Echouée',
      });
      break;
    case TypeMessage.DEL_SUCCESS:
      Swal.fire({
        icon: 'success',
        title: 'Confirmation',
        text: 'Suppression Effectuée',
      });
      break;
    case TypeMessage.UPD_ERROR:
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Mise a jour Echouée',
      });
      break;
    case TypeMessage.UPD_SUCCESS:
      Swal.fire({
        icon: 'success',
        title: 'Confirmation',
        text: 'Mise a jour Succes',
      });
      break;
    default:
      // Logique à exécuter si aucun des cas précédents ne correspond à la valeur de choix
      break;
  }
}

export interface DataDTO {
  id?: number;
  libelle: string | Date;
  action?: string;
}
