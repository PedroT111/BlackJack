import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardsService } from 'src/services/cards.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  cartasUsuario: any = [];
  cartasCroupier: any = [];
  puntajeCroupier: number;
  puntajeUsuario: number;
  turnoJugador: boolean;

  constructor(private serviceCard: CardsService) {}

  ngOnInit(): void {
    this.puntajeCroupier = 0;
    this.puntajeUsuario = 0;
    this.turnoJugador = true;

    this.iniciarJuego();
  }

  obtenerCartasCroupier() {
    const card = this.serviceCard.obtenerCartaAleatoria('croupier');
    this.cartasCroupier.push(card);
    this.obtenerPuntos(card, 'croupier');
  }

  obtenerCartasJugador() {
    const card = this.serviceCard.obtenerCartaAleatoria('jugador');
    this.cartasUsuario.push(card);
    this.obtenerPuntos(card, 'jugador');
  }

  obtenerPuntos(idCarta: string, jugador: string) {
    let valorCarta = 0;
    let reales = [
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
    ];
    let ases = ['AC', 'AD', 'AH', 'AS'];
    if (jugador === 'croupier') {
      if (reales.includes(idCarta)) {
        valorCarta = 10;
      } else if (ases.includes(idCarta)) {
        valorCarta = 11;
        if (this.puntajeCroupier + valorCarta > 21) {
          valorCarta = 1;
        }
      } else {
        // console.log(idCarta);
        valorCarta = parseInt(idCarta.substring(0, idCarta.length - 1));
      }
      // console.log(valorCarta);
      this.puntajeCroupier += valorCarta;
    } else if (jugador === 'jugador') {
      if (reales.includes(idCarta)) {
        valorCarta = 10;
      } else if (ases.includes(idCarta)) {
        valorCarta = 11;
        if (this.puntajeUsuario + valorCarta > 21) {
          valorCarta = 1;
        }
      } else {
        console.log(idCarta);
        valorCarta = parseInt(idCarta.substring(0, idCarta.length - 1));
      }
      console.log(valorCarta);
      this.puntajeUsuario += valorCarta;
      if(this.puntajeUsuario>21){
        alert('Perdiste! :(');
      }
    }
  }

  repartir() {
    if (this.turnoJugador) {
      this.obtenerCartasJugador();
    } else {
      this.obtenerCartasCroupier();
    }
  }

  iniciarJuego() {
    for (let i = 0; i < 4; i++) {
      this.repartir();
      this.turnoJugador = !this.turnoJugador;
    }
    this.turnoJugador = true;
  }

  jugadaCroupier() {
    while (this.puntajeCroupier < 17) {
      this.obtenerCartasCroupier();
    }
    if (this.puntajeCroupier > 10) {
      alert('Perdió el croupier :)');
    }
  }

  obtenerResultado() {
    if (this.puntajeUsuario > this.puntajeCroupier) {
      this.jugadaCroupier();
    } else if (this.puntajeUsuario < this.puntajeCroupier) {
      alert('Perdiste! :/')
    }
  }
}
