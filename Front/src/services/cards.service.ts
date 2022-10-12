import { Injectable } from '@angular/core';
import { Observable, reduce } from 'rxjs';
import { Carta } from 'src/app/models/carta';
import { cartas } from '../db/db';
import Swal from 'sweetalert2';

@Injectable()
export class CardsService {
  private token: any;
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
    //this.token = this.getTokenUser();
  }

  /*getTokenUser() {
    const token = localStorage.getItem('token');
    if (token) {
      return `Bearer ${token}`;
    }
    return null;
  };*/



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
        const cartasConAses = this.cartasCroupier.filter(this.tieneAs);
        console.log(cartasConAses);
        cartasConAses.forEach((i) => {
          if (puntos > 21) {
            puntos -= 10;
          }
        });
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
        const cartasConAses = this.cartasUsuario.filter(this.tieneAs);
        console.log(cartasConAses);
        cartasConAses.forEach((i) => {
          if (puntos > 21) {
            puntos -= 10;
          }
        });
      }

      this.puntajeUsuario = puntos;

      if (this.puntajeUsuario > 21) {
        setTimeout(() => {
          this.alerta('error', 'Perdiste!')
        }, 500);
      }
    }
  }

  tieneAs(carta: Carta) {
    if (carta.valor === 'as') {
      return true;
    }
    return false;
  }

  obtenerResultado() {
    while (this.puntajeCroupier < 17) {
      this.obtenerCartaAleatoria('croupier');
    }
    if (
      this.puntajeCroupier < 22 &&
      this.puntajeCroupier > this.puntajeUsuario
    ) {
      this.alerta('error', 'Perdiste!')
    } else if (
      this.puntajeCroupier < 22 &&
      this.puntajeCroupier < this.puntajeUsuario
    ) {
      if (this.blackJackJugador()) {
        this.alerta('success', 'Ganaste con un Blackjack!')
      } else {
        this.alerta('success', 'Ganaste!')
      }
    } else if (
      this.puntajeCroupier < 22 &&
      this.puntajeCroupier === this.puntajeUsuario
    ) {
      if (this.blackJackJugador()) {
        this.alerta('success', 'Ganaste con un Blackjack!')
      } else {
        this.alerta('warning', 'Empate!')
      }
    } else if (this.puntajeCroupier > 21) {
      this.alerta('success', 'Ganaste!')
    }
  }

  blackJackJugador() {
    return this.cartasUsuario.length === 2 && this.puntajeUsuario === 21;
  }

  alerta(tipo: any, titulo: any) {
    setTimeout(() => {
      Swal.fire({
        icon: tipo,
        title: titulo,
        timer: 2000,
        showConfirmButton: false,
      });
    }, 500);
  }
}
