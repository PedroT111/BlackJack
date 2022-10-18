import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardsService } from 'src/services/cards.service';
import { JugadaService } from 'src/services/jugada.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  turnoJugador: boolean;
  banderaInicio: boolean;

  usuarioId: any;
  cantMazos: number = 2;
  idMazo: number;
  cartasRetirada: any[] = [];
  cartasCroupier: any[] = [];
  cartasJugador: any[] = [];
  constructor(private serviceCard: CardsService, private jugadaService: JugadaService) {
    this.usuarioId = localStorage.getItem('usuarioId');
  }

  ngOnInit(): void {
    this.turnoJugador = true;
    this.banderaInicio = true;
    this.iniciarJuego();
    console.log(this.usuarioId);

    //Crea el mazo
    this.jugadaService.nuevaJugada(this.usuarioId, this.cantMazos).subscribe({
      next: (res) => {
        console.log(res.mazo.id);
        this.idMazo = res.mazo.id;

        this.retirarCartas();

      },
      error: () => {
        console.log("Error")
      }
    })

  }

  //Saca 4 cartas del mazo
  retirarCartas(){
    this.jugadaService.retirarCarta(this.idMazo, 4).subscribe({
      next: (res) => {
        this.cartasRetirada = res.cartasRetiradas;
        console.log(this.cartasRetirada)

        //reparte las cartas
        this.repartirPrimeras4Cartas();

      },
      error: () => {
        console.log("Error")
      }
    })
  }
  //Reparte las primeras cartas de la jugada
  repartirPrimeras4Cartas(){
    for (let i = 0; i < 4; i++) {
      if(this.turnoJugador){
        this.cartasJugador.push(this.cartasRetirada[i]);
      } else{
        this.cartasCroupier.push(this.cartasRetirada[i]);
      }
      this.turnoJugador = !this.turnoJugador;
    }
    this.turnoJugador = true;
    console.log(this.cartasCroupier);
    console.log(this.cartasJugador)
  }
 

  obtenerCartasCroupier() {
    this.serviceCard.obtenerCartaAleatoria('croupier');
  }

  obtenerCartasJugador() {
    this.serviceCard.obtenerCartaAleatoria('jugador');
    if (this.serviceCard.puntajeUsuario > 21) {
      this.banderaInicio = false;
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
    this.serviceCard.obtenerResultado();
    this.banderaInicio = false;
  }
}
