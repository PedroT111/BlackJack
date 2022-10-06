import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carta } from 'src/app/models/carta';

@Injectable()
export class CardsService {
  cartas: Carta[] = [
    {
      id: 1,
      valor: '2',
      palo: 'clubs',
      valorJuego: 2,
      img: '../assets/cartas/png-cartas/2_of_clubs.png',
    },
    {
      id: 2,
      valor: '2',
      palo: 'diamonds',
      valorJuego: 2,
      img: '../assets/cartas/png-cartas/2_of_diamonds.png',
    },
    {
      id: 3,
      valor: '2',
      palo: 'hearts',
      valorJuego: 2,
      img: '../assets/cartas/png-cartas/2_of_hearts.png',
    },
    {
      id: 4,
      valor: '2',
      palo: 'spades',
      valorJuego: 2,
      img: '../assets/cartas/png-cartas/2_of_spades.png',
    },
    {
      id: 5,
      valor: '3',
      palo: 'clubs',
      valorJuego: 3,
      img: '../assets/cartas/png-cartas/3_of_clubs.png',
    },
    {
      id: 6,
      valor: '3',
      palo: 'diamonds',
      valorJuego: 3,
      img: '../assets/cartas/png-cartas/3_of_diamonds.png',
    },
    {
      id: 7,
      valor: '3',
      palo: 'hearts',
      valorJuego: 3,
      img: '../assets/cartas/png-cartas/3_of_hearts.png',
    },
    {
      id: 8,
      valor: '3',
      palo: 'spades',
      valorJuego: 3,
      img: '../assets/cartas/png-cartas/3_of_spades.png',
    },
    {
      id: 9,
      valor: '4',
      palo: 'clubs',
      valorJuego: 4,
      img: '../assets/cartas/png-cartas/4_of_clubs.png',
    },
    {
      id: 10,
      valor: '4',
      palo: 'diamonds',
      valorJuego: 4,
      img: '../assets/cartas/png-cartas/4_of_diamonds.png',
    },
    {
      id: 11,
      valor: '4',
      palo: 'hearts',
      valorJuego: 4,
      img: '../assets/cartas/png-cartas/4_of_hearts.png',
    },
    {
      id: 12,
      valor: '4',
      palo: 'spades',
      valorJuego: 4,
      img: '../assets/cartas/png-cartas/4_of_spades.png',
    },
    {
      id: 13,
      valor: '5',
      palo: 'clubs',
      valorJuego: 5,
      img: '../assets/cartas/png-cartas/5_of_clubs.png',
    },
    {
      id: 14,
      valor: '5',
      palo: 'diamonds',
      valorJuego: 5,
      img: '../assets/cartas/png-cartas/5_of_diamonds.png',
    },
    {
      id: 15,
      valor: '5',
      palo: 'hearts',
      valorJuego: 5,
      img: '../assets/cartas/png-cartas/5_of_hearts.png',
    },
    {
      id: 16,
      valor: '5',
      palo: 'spades',
      valorJuego: 5,
      img: '../assets/cartas/png-cartas/5_of_spades.png',
    },
    {
      id: 17,
      valor: '6',
      palo: 'clubs',
      valorJuego: 6,
      img: '../assets/cartas/png-cartas/6_of_clubs.png',
    },
    {
      id: 18,
      valor: '6',
      palo: 'diamonds',
      valorJuego: 6,
      img: '../assets/cartas/png-cartas/6_of_diamonds.png',
    },
    {
      id: 19,
      valor: '6',
      palo: 'hearts',
      valorJuego: 6,
      img: '../assets/cartas/png-cartas/6_of_hearts.png',
    },
    {
      id: 20,
      valor: '6',
      palo: 'spades',
      valorJuego: 6,
      img: '../assets/cartas/png-cartas/6_of_spades.png',
    },
    {
      id: 21,
      valor: '7',
      palo: 'clubs',
      valorJuego: 7,
      img: '../assets/cartas/png-cartas/7_of_clubs.png',
    },
    {
      id: 22,
      valor: '7',
      palo: 'diamonds',
      valorJuego: 7,
      img: '../assets/cartas/png-cartas/7_of_diamonds.png',
    },
    {
      id: 23,
      valor: '7',
      palo: 'hearts',
      valorJuego: 7,
      img: '../assets/cartas/png-cartas/7_of_hearts.png',
    },
    {
      id: 24,
      valor: '7',
      palo: 'spades',
      valorJuego: 7,
      img: '../assets/cartas/png-cartas/7_of_spades.png',
    },
    {
      id: 25,
      valor: '8',
      palo: 'clubs',
      valorJuego: 8,
      img: '../assets/cartas/png-cartas/8_of_clubs.png',
    },
    {
      id: 26,
      valor: '8',
      palo: 'diamonds',
      valorJuego: 8,
      img: '../assets/cartas/png-cartas/8_of_diamonds.png',
    },
    {
      id: 27,
      valor: '8',
      palo: 'hearts',
      valorJuego: 8,
      img: '../assets/cartas/png-cartas/8_of_hearts.png',
    },
    {
      id: 28,
      valor: '8',
      palo: 'spades',
      valorJuego: 8,
      img: '../assets/cartas/png-cartas/8_of_spades.png',
    },
    {
      id: 29,
      valor: '9',
      palo: 'clubs',
      valorJuego: 9,
      img: '../assets/cartas/png-cartas/9_of_clubs.png',
    },
    {
      id: 30,
      valor: '9',
      palo: 'diamonds',
      valorJuego: 9,
      img: '../assets/cartas/png-cartas/9_of_diamonds.png',
    },
    {
      id: 31,
      valor: '9',
      palo: 'hearts',
      valorJuego: 9,
      img: '../assets/cartas/png-cartas/9_of_hearts.png',
    },
    {
      id: 32,
      valor: '9',
      palo: 'spades',
      valorJuego: 9,
      img: '../assets/cartas/png-cartas/9_of_spades.png',
    },
    {
      id: 33,
      valor: '10',
      palo: 'clubs',
      valorJuego: 10,
      img: '../assets/cartas/png-cartas/10_of_clubs.png',
    },
    {
      id: 34,
      valor: '10',
      palo: 'diamonds',
      valorJuego: 10,
      img: '../assets/cartas/png-cartas/10_of_diamonds.png',
    },
    {
      id: 35,
      valor: '10',
      palo: 'hearts',
      valorJuego: 10,
      img: '../assets/cartas/png-cartas/10_of_hearts.png',
    },
    {
      id: 36,
      valor: '10',
      palo: 'spades',
      valorJuego: 10,
      img: '../assets/cartas/png-cartas/10_of_spades.png',
    },
    {
      id: 37,
      valor: 'as',
      palo: 'clubs',
      valorJuego: 11,
      img: '../assets/cartas/png-cartas/ace_of_clubs.png',
    },
    {
      id: 38,
      valor: 'as',
      palo: 'diamonds',
      valorJuego: 11,
      img: '../assets/cartas/png-cartas/ace_of_diamonds.png',
    },
    {
      id: 39,
      valor: 'as',
      palo: 'hearts',
      valorJuego: 11,
      img: '../assets/cartas/png-cartas/ace_of_hearts.png',
    },
    {
      id: 40,
      valor: 'as',
      palo: 'spades',
      valorJuego: 11,
      img: '../assets/cartas/png-cartas/ace_of_spades.png',
    },
    {
      id: 41,
      valor: 'j',
      palo: 'clubs',
      valorJuego: 10,
      img: '../assets/cartas/png-cartas/jack_of_clubs.png',
    },
    {
      id: 42,
      valor: 'j',
      palo: 'diamonds',
      valorJuego: 10,
      img: '../assets/cartas/png-cartas/jack_of_diamonds.png',
    },
    {
      id: 43,
      valor: 'j',
      palo: 'hearts',
      valorJuego: 10,
      img: '../assets/cartas/png-cartas/jack_of_hearts.png',
    },
    {
      id: 44,
      valor: 'j',
      palo: 'spades',
      valorJuego: 10,
      img: '../assets/cartas/png-cartas/jack_of_spades.png',
    },
    {
      id: 45,
      valor: 'k',
      palo: 'clubs',
      valorJuego: 10,
      img: '../assets/cartas/png-cartas/king_of_clubs.png',
    },
    {
      id: 46,
      valor: 'k',
      palo: 'diamonds',
      valorJuego: 10,
      img: '../assets/cartas/png-cartas/king_of_diamonds.png',
    },
    {
      id: 47,
      valor: 'k',
      palo: 'hearts',
      valorJuego: 10,
      img: '../assets/cartas/png-cartas/king_of_hearts.png',
    },
    {
      id: 48,
      valor: 'k',
      palo: 'spades',
      valorJuego: 10,
      img: '../assets/cartas/png-cartas/king_of_spades.png',
    },
    {
      id: 49,
      valor: 'q',
      palo: 'clubs',
      valorJuego: 10,
      img: '../assets/cartas/png-cartas/queen_of_clubs.png',
    },
    {
      id: 50,
      valor: 'q',
      palo: 'diamonds',
      valorJuego: 10,
      img: '../assets/cartas/png-cartas/queen_of_diamonds.png',
    },
    {
      id: 51,
      valor: 'q',
      palo: 'hearts',
      valorJuego: 10,
      img: '../assets/cartas/png-cartas/queen_of_hearts.png',
    },
    {
      id: 52,
      valor: 'q',
      palo: 'spades',
      valorJuego: 10,
      img: '../assets/cartas/png-cartas/queen_of_spades.png',
    },
  ];

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
