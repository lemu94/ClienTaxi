export let url_api: string = 'https://localhost:7117';
export enum Menu {
  'Personne' = 'Personne',
  'Taxi' = 'Taxi',
  'Commande' = 'Commande',
}
export class TaxiApi {
  static readonly AfficheTaxi = '/api/Taxi';
  static readonly ListeTaxi = '/api/Taxi/Liste';
  static readonly AjouterTaxi = '/api/Taxi/Ajouter';
  static readonly ModifierTaxi = '/api/Taxi/Modifier';
  static readonly SupprimerTaxi = '/api/Taxi';

  static readonly AffichePersonne = '/api/Personne';
  static readonly ListePersonne = '/api/Personne/Liste';
  static readonly ModifierPersonne = '/api/Personne/Modifier';
  static readonly SupprimerPersonne = '/api/Personne/';
  static readonly AjouterPersonne = '/api/Personne/Ajouter';

  static readonly AfficheCommande = '';
  static readonly ListeCommande = '';
  static readonly ModifierCommande = '';
  static readonly SupprimerCommande = '';
  static readonly AjouterCommande = '';
}
