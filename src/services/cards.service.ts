import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carta } from 'src/app/models/carta';
import { cartas } from '../db/db';

@Injectable()
export class CardsService {
  cartas: Carta[] = cartas;

  cartasDisponibles: Carta[] = [];
  cartasCroupier: Carta[] = [];
  cartasUsuario: Carta[] = [];
  puntajeCroupier: number;
  puntajeUsuario: number;

  constructor() {
    this.cartasDisponibles = this.cartas.slice();
    this.puntajeCroupier = 0;
    this.puntajeUsuario = 0;
  }

  restablecer() {
    this.cartasDisponibles = this.cartas.slice();
    this.cartasCroupier = [];
    this.cartasUsuario = [];
    this.puntajeCroupier = 0;
    this.puntajeUsuario = 0;
  }

  obtenerCartaAleatoria(jugador: string) {
    let carta: Carta = this.cartasDisponibles.splice(
      Math.floor(Math.random() * this.cartasDisponibles.length),
      1
    )[0] as Carta;
    if (jugador == 'jugador') {
      this.cartasUsuario.push(carta);
      this.obtenerPuntos(jugador);
    } else {
      this.cartasCroupier.push(carta);
      this.obtenerPuntos(jugador);
    }
  }

  obtenerCartasCroupier(): Carta[] {
    return this.cartasCroupier;
  }
  obtenerCartasUsuario(): Carta[] {
    return this.cartasUsuario;
  }

  obtenerPuntos(jugador: string) {
    let puntos = 0;
    if (jugador === 'croupier') {
      this.cartasCroupier.forEach((carta) => {
        puntos += carta.valorJuego;
      });

      if (
        this.cartasCroupier.find((element) => element.valor === 'as') !=
        undefined
      ) {
        if (puntos > 21) {
          puntos -= 10;
        }
      }

      this.puntajeCroupier = puntos;
    } else if (jugador === 'jugador') {
      this.cartasUsuario.forEach((carta) => {
        puntos += carta.valorJuego;
      });

      if (
        this.cartasUsuario.find((element) => element.valor === 'as') !=
        undefined
      ) {
        if (puntos > 21) {
          puntos -= 10;
        }
      }

      this.puntajeUsuario = puntos;

      if (this.puntajeUsuario > 21) {
        alert('Perdiste! :(');
      }
    }
  }

  obtenerResultado() {
    /*if (this.puntajeUsuario > this.puntajeCroupier) {
      this.jugadaCroupier();
    } else if (this.puntajeUsuario < this.puntajeCroupier) {
      alert('Perdiste! :/')
    }*/
    while (this.puntajeCroupier < 17) {
      this.obtenerCartaAleatoria('croupier');
    }
    if (
      this.puntajeCroupier < 22 &&
      this.puntajeCroupier > this.puntajeUsuario
    ) {
      alert('Perdiste!');
    } else if (
      this.puntajeCroupier < 22 &&
      this.puntajeCroupier < this.puntajeUsuario
    ) {
      alert('Ganaste!');
    } else if (
      this.puntajeCroupier < 22 &&
      this.puntajeCroupier === this.puntajeUsuario
    ) {
      alert('Empate!');
    } else if (this.puntajeCroupier > 21) {
      alert('Ganaste!');
    }
  }
}
