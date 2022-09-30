import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CardsService {
  cartas = [
    '2C',
    '2D',
    '2H',
    '2S',
    '3C',
    '3D',
    '3H',
    '3S',
    '4C',
    '4D',
    '4H',
    '4S',
    '5C',
    '5D',
    '5H',
    '5S',
    '6C',
    '6D',
    '6H',
    '6S',
    '7C',
    '7D',
    '7H',
    '7S',
    '8C',
    '8D',
    '8H',
    '8S',
    '9C',
    '9D',
    '9H',
    '9S',
    '10C',
    '10D',
    '10H',
    '10S',
    'JC',
    'JD',
    'JH',
    'JS',
    'QC',
    'QD',
    'QH',
    'QS',
    'KC',
    'KD',
    'KH',
    'KS',
    'AC',
    'AD',
    'AH',
    'AS',
  ];

  cartasDisponibles: string[] = [];
  cartasCroupier: string[] = [];
  cartasUsuario: string[] = [];

  constructor() {
    this.cartasDisponibles = this.cartas.slice();
  }

  restablecer(){
    this.cartasDisponibles = this.cartas.slice();
    this.cartasCroupier = [];
    this.cartasUsuario = [];
  }

  obtenerCartaAleatoria(jugador: string) {
    const card = this.cartasDisponibles.splice(
      Math.floor(Math.random() * this.cartasDisponibles.length),
      1
    )[0];
    if (jugador == 'user') {
      this.cartasUsuario.push(card);
    } else {
      this.cartasCroupier.push(card);
    }
    return card;
  }
}
