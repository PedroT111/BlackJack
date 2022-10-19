import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Carta } from 'src/app/models/carta';
import { cartas } from 'src/db/db';
import { JugadaService } from 'src/services/jugada.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  turnoJugador: boolean;
  banderaInicio: boolean = true;
  usuarioId: any;
  cantMazos: number = 1;
  idMazo: number;
  cartasRetirada: any[] = [];
  cartasCroupier: any[] = [];
  cartasJugador: any[] = [];
  puntajeCroupier: number;
  puntajeJugador: number;
  jugadaId: number;
  gano: boolean;
  terminada: boolean = false;
  constructor(private jugadaService: JugadaService) {
    this.usuarioId = localStorage.getItem('usuarioId');
  }

  ngOnInit(): void {
    this.iniciarJuego();
  }

  iniciarJuego(){
    this.jugadaService.nuevaJugada(this.usuarioId, this.cantMazos).subscribe({
      next: (res) => {
        this.idMazo = res.mazo.id;
        this.jugadaId = res.jugada.id;


        this.retirarCartas();

      },
      error: () => {
        console.log("Error")
      }
    })
  }
  //Saca 20 cartas del mazo
  retirarCartas(){
    this.jugadaService.retirarCarta(this.idMazo, 20).subscribe({
      next: (res) => {
        this.cartasRetirada = res.cartasRetiradas;
        //reparte las cartas
        this.repartirPrimeras4Cartas();
        this.obtenerPuntos('jugador');
        this.obtenerPuntos('croupier');
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
        this.cartasRetirada.splice(i, 1);
      } else{
        this.cartasCroupier.push(this.cartasRetirada[i]);
        this.cartasRetirada.splice(i, 1);
      }
      this.turnoJugador = !this.turnoJugador;
    }
    this.turnoJugador = true;
  }

  obtenerCartas(jugador: string){
    if (jugador == 'jugador') {
      this.cartasJugador.push(this.cartasRetirada[0]);
      this.cartasRetirada.splice(0,1);
      this.obtenerPuntos(jugador);
    } else {
      this.cartasCroupier.push(this.cartasRetirada[0]);
      this.cartasRetirada.splice(0,1);
      this.obtenerPuntos(jugador);
    }
  }
  reiniciar(){
    //Registrar jugada y reiniciar
    this.registrarJugada();
    this.turnoJugador = true;
    this.banderaInicio = true;
    this.cartasRetirada = [];
    this.cartasCroupier= [];
    this.cartasJugador= [];
    this.puntajeCroupier= 0;
    this.puntajeJugador= 0;
    this.iniciarJuego();
  }

  registrarJugada(){
    //metodo que registre la jugada en la api
    this.terminada = true;
    this.jugadaService.editarJugada(this.jugadaId, this.puntajeCroupier, this.puntajeJugador, cartas, this.cartasJugador, this.gano, this.terminada).subscribe({
      next:(res) => {
        console.log(res);
      },
      error: () => {
        console.log('error');
      }
    })

    
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
        //console.log(cartasConAses);
        cartasConAses.forEach((i) => {
          if (puntos > 21) {
            puntos -= 10;
          }
        });
      }

      this.puntajeCroupier = puntos;
    } else if (jugador === 'jugador') {
      this.cartasJugador.forEach((carta) => {
        puntos += carta.valorJuego;
      });

      if (
        this.cartasJugador.find((element) => element.valor === 'as') !=
        undefined
      ) {
        const cartasConAses = this.cartasJugador.filter(this.tieneAs);
        //console.log(cartasConAses);
        cartasConAses.forEach((i) => {
          if (puntos > 21) {
            puntos -= 10;
          }
        });
      }

      this.puntajeJugador = puntos;

      if (this.puntajeJugador > 21) {
        setTimeout(() => {
          this.alerta('error', 'Perdiste!')
          this.gano= false;
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
    this.banderaInicio = false;
    //este while me genera un bucle infinito
    while (this.puntajeCroupier < 17) {
     this.obtenerCartas('croupier');
    }
    if (
      this.puntajeCroupier < 22 &&
      this.puntajeCroupier > this.puntajeJugador
    ) {
      this.alerta('error', 'Perdiste!');
      this.gano= false;
    } else if (
      this.puntajeCroupier < 22 &&
      this.puntajeCroupier < this.puntajeJugador
    ) {
      if (this.blackJackJugador()) {
        this.alerta('success', 'Ganaste con un Blackjack!')
        this.gano= true;
      } else {
        this.alerta('success', 'Ganaste!');
        this.gano= true;
      }
    } else if (
      this.puntajeCroupier < 22 &&
      this.puntajeCroupier === this.puntajeJugador
    ) {
      if (this.blackJackJugador()) {
        this.alerta('success', 'Ganaste con un Blackjack!')
        this.gano= true;
      } else {
        this.alerta('warning', 'Empate!')
        this.gano= false;
      }
    } else if (this.puntajeCroupier > 21) {
      this.alerta('success', 'Ganaste!')
      this.gano= true;
    }
  }

  blackJackJugador() {
    return this.cartasJugador.length === 2 && this.puntajeJugador === 21;
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
