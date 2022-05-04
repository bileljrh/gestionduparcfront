import {Injectable} from '@angular/core';
import {DistributionCarburant} from './distribution-carburant';

@Injectable({
  providedIn: 'root'
})
export class CarburantService {
  private _DCF: DistributionCarburant[];
  private _DCFvp: DistributionCarburant[];
  private _DCFc: DistributionCarburant[];
  private _DCS: DistributionCarburant[];
  private _DCSsa: DistributionCarburant[];
  private _DCSqc: DistributionCarburant[];
  private _UGP: string[] = ['Parc central', 'Parc secondaire 1', 'Parc secondaire 2', 'Parc secondaire 3', 'Parc secondaire 4', 'Parc secondaire 5'];

  constructor() {
    this._DCF = [
      {
        matricule: '70350',
        beneficiaire: 'Jarrod Wright',
        vehicule: '19-350',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 11,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70842',
        beneficiaire: 'Nguta Ithyan',
        vehicule: '19-320',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 8,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70780',
        beneficiaire: 'Tamzyn French',
        vehicule: '19-210',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 13,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70120',
        beneficiaire: 'Salome Simoes',
        vehicule: '19-910',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 14,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70780',
        beneficiaire: 'Trevor Virtue',
        vehicule: '19-012',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 10,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70520',
        beneficiaire: 'Tarryn Campbell-Gillies',
        vehicule: '19-110',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 7,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70120',
        beneficiaire: 'Andrew Kazantzis',
        vehicule: '19-443',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 13,
        supprimer: '',
        modifier: ''
      }];
    this._DCFvp = [
      {
        matricule: '70350',
        beneficiaire: 'Verona Blair',
        vehicule: '19-350',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 24,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70842',
        beneficiaire: 'Maureen M. Smith',
        vehicule: '19-320',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 13,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70780',
        beneficiaire: 'Jane Meldrum',
        vehicule: '19-210',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 6,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70120',
        beneficiaire: 'Desiree Burch',
        vehicule: '19-910',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 13,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70780',
        beneficiaire: 'Daly Harry',
        vehicule: '19-012',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 25,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70520',
        beneficiaire: 'Hayman Andrews',
        vehicule: '19-110',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 4,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70120',
        beneficiaire: 'Ruveni Ellawala',
        vehicule: '19-443',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 19,
        supprimer: '',
        modifier: ''
      }];
    this._DCFc = [
      {
        matricule: '70350',
        beneficiaire: 'Devon Jacobs',
        vehicule: '19-350',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 18,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70842',
        beneficiaire: 'Peyton Chen',
        vehicule: '19-320',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 4,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70780',
        beneficiaire: 'Bria Kelly',
        vehicule: '19-210',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 16,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70120',
        beneficiaire: 'Breanna Sanders',
        vehicule: '19-910',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 15,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70780',
        beneficiaire: 'Charlie Mcdonald',
        vehicule: '19-012',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 7,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70520',
        beneficiaire: 'Vanessa Wong',
        vehicule: '19-110',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 17,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70120',
        beneficiaire: 'Moises Rowe',
        vehicule: '19-443',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 9,
        supprimer: '',
        modifier: ''
      }];
    this._DCS = [
      {
        matricule: '70350',
        beneficiaire: 'Jaime Vaughn',
        vehicule: '19-350',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 18,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70842',
        beneficiaire: 'Troy Barber',
        vehicule: '19-320',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 4,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70780',
        beneficiaire: 'Justin Hall',
        vehicule: '19-210',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 16,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70120',
        beneficiaire: 'Jonah Tran',
        vehicule: '19-910',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 15,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70780',
        beneficiaire: 'Henry Yang',
        vehicule: '19-012',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 7,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70520',
        beneficiaire: 'Tyler Patterson',
        vehicule: '19-110',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 17,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70120',
        beneficiaire: 'Brody Robinson',
        vehicule: '19-443',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 9,
        supprimer: '',
        modifier: ''
      }];
    this._DCSsa = [
      {
        matricule: '70350',
        beneficiaire: 'Tevin Nelson',
        vehicule: '19-350',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 18,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70842',
        beneficiaire: 'Bethany Bishop',
        vehicule: '19-320',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 4,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70780',
        beneficiaire: 'Wilson Carter',
        vehicule: '19-210',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 16,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70120',
        beneficiaire: 'Monica Vega',
        vehicule: '19-910',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 15,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70780',
        beneficiaire: 'Jocelyn Moody',
        vehicule: '19-012',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 7,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70520',
        beneficiaire: 'Paula Holland',
        vehicule: '19-110',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 17,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70120',
        beneficiaire: 'Derrick Woods',
        vehicule: '19-443',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 9,
        supprimer: '',
        modifier: ''
      }];
    this._DCSqc = [
      {
        matricule: '70350',
        beneficiaire: 'Kurtis Norman',
        vehicule: '19-350',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 18,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70842',
        beneficiaire: 'Susan Reed',
        vehicule: '19-320',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 4,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70780',
        beneficiaire: 'Monique Ruiz',
        vehicule: '19-210',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 16,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70120',
        beneficiaire: 'Jordan Hubbard',
        vehicule: '19-910',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 15,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70780',
        beneficiaire: 'Devin Ellis',
        vehicule: '19-012',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 7,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70520',
        beneficiaire: 'Francisco Robbins',
        vehicule: '19-110',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 17,
        supprimer: '',
        modifier: ''
      },
      {
        matricule: '70120',
        beneficiaire: 'Gabriela Lloyd',
        vehicule: '19-443',
        carburant: 'S/Plomb 20L',
        nbrDeBons: 9,
        supprimer: '',
        modifier: ''
      }];
  }


  get DCFvp(): DistributionCarburant[] {
    return this._DCFvp;
  }

  set DCFvp(value: DistributionCarburant[]) {
    this._DCFvp = value;
  }

  get DCFc(): DistributionCarburant[] {
    return this._DCFc;
  }

  set DCFc(value: DistributionCarburant[]) {
    this._DCFc = value;
  }

  get DCS(): DistributionCarburant[] {
    return this._DCS;
  }

  set DCS(value: DistributionCarburant[]) {
    this._DCS = value;
  }

  get DCSsa(): DistributionCarburant[] {
    return this._DCSsa;
  }

  set DCSsa(value: DistributionCarburant[]) {
    this._DCSsa = value;
  }

  get DCSqc(): DistributionCarburant[] {
    return this._DCSqc;
  }

  set DCSqc(value: DistributionCarburant[]) {
    this._DCSqc = value;
  }

  get UGP(): string[] {
    return this._UGP;
  }

  set UGP(value: string[]) {
    this._UGP = value;
  }

  get DCF(): DistributionCarburant[] {
    return this._DCF;
  }

  set DCF(value: DistributionCarburant[]) {
    this._DCF = value;
  }
}
