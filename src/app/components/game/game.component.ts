import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardsService } from 'src/services/cards.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  turnoJugador: boolean;
  banderaInicio: boolean;

  constructor(private serviceCard: CardsService) {}

  ngOnInit(): void {
    this.turnoJugador = true;
    this.banderaInicio = true;
    this.iniciarJuego();
  }

  obtenerCartasCroupier() {
    this.serviceCard.obtenerCartaAleatoria('croupier');
  }

  obtenerCartasJugador() {
    this.serviceCard.obtenerCartaAleatoria('jugador');
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

  reiniciar() {
    this.serviceCard.restablecer();
    this.iniciarJuego();
    this.turnoJugador = true;
    this.banderaInicio = true;
  }

  /*jugadaCroupier() {
    while (this.puntajeCroupier < 17) {
      this.obtenerCartasCroupier();
    }
    if (this.puntajeCroupier > 10) {
      alert('Perdió el croupier :)');
    }
  }*/

  obtenerResultado() {
    this.banderaInicio = false;
    this.serviceCard.obtenerResultado();
  }
}
