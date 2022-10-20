import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Carta } from 'src/app/models/carta';
import { Jugada } from 'src/app/models/jugada';
import { JugadaService } from 'src/services/jugada.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit, OnDestroy {
  turnoJugador: boolean;
  banderaInicio: boolean = true;
  usuarioId: any;
  cantMazos: number = 1;
  idMazo: number;
  jugada = {} as Jugada;
  cartasRetirada: any[] = [];
  subscribe: Subscription = new Subscription();

  constructor(private jugadaService: JugadaService) {
    this.usuarioId = localStorage.getItem('usuarioId');
    this.jugada.cartasCroupier = [];
    this.jugada.cartasUsuario = [];
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  ngOnInit(): void {
    this.consultarUltimaJugada();
  }
  consultarUltimaJugada(){
    this.subscribe.add(this.jugadaService.consultarUltimaJugada(this.usuarioId).subscribe({
      next: (res) => {
        if(res != null){
          this.jugada = res.jugada;
          console.log(this.jugada);
        } else{
          this.iniciarJuego();
        }
      },
      error: () => {
        console.log("Error")
      }
    }));
  }
  iniciarJuego(){
    this.subscribe.add(this.jugadaService.nuevaJugada(this.usuarioId, this.cantMazos).subscribe({
      next: (res) => {
        this.idMazo = res.mazo.id;
        this.jugada.JugadaId = res.jugada.id;
        console.log(this.jugada.JugadaId, 'al iniciar');

        this.retirarCartas();

      },
      error: () => {
        console.log("Error")
      }
    }));
  }
  //Saca 20 cartas del mazo
  retirarCartas(){
    this.subscribe.add(this.jugadaService.retirarCarta(this.idMazo, 20).subscribe({
      next: (res) => {
        this.cartasRetirada = res.cartasRetiradas;
        this.repartirPrimeras4Cartas();
        this.obtenerPuntos('jugador');
        this.obtenerPuntos('croupier');
        console.log(this.jugada.JugadaId, 'al retirar');
      },
      error: () => {
        console.log("Error")
      }
    }));
  }

  registrarJugada(){
    this.jugada.terminada = true;
    console.log(this.jugada.JugadaId, 'al registrar');
    this.subscribe.add(this.jugadaService.editarJugada(this.jugada).subscribe({
      next:(res) => {
        console.log(res);
      },
      error: () => {
        console.log('error');
      }
    }));    
  }
  //Reparte las primeras cartas de la jugada
  repartirPrimeras4Cartas(){
    for (let i = 0; i < 4; i++) {
      if(this.turnoJugador){
        this.jugada.cartasUsuario.push(this.cartasRetirada[i]);
        this.cartasRetirada.splice(i, 1);
      } else{
        this.jugada.cartasCroupier.push(this.cartasRetirada[i]);
        this.cartasRetirada.splice(i, 1);
      }
      this.turnoJugador = !this.turnoJugador;
    }
    this.turnoJugador = true;
  }

  obtenerCartas(jugador: string){
    if (jugador == 'jugador') {
      this.jugada.cartasUsuario.push(this.cartasRetirada[0]);
      this.cartasRetirada.splice(0,1);
      this.obtenerPuntos(jugador);
    } else {
      this.jugada.cartasCroupier.push(this.cartasRetirada[0]);
      this.cartasRetirada.splice(0,1);
      this.obtenerPuntos(jugador);
    }
  }

  reiniciar(){
    this.registrarJugada();
    this.turnoJugador = true;
    this.banderaInicio = true;
    this.cartasRetirada = [];
    this.jugada = {} as Jugada;
    this.jugada.cartasCroupier = [];
    this.jugada.cartasUsuario = [];
    this.iniciarJuego();
  }

  obtenerPuntos(jugador: string) {
    let puntos = 0;
    if (jugador === 'croupier') {
      this.jugada.cartasCroupier.forEach((carta) => {
        puntos += carta.valorJuego;
      });

      if (
        this.jugada.cartasCroupier.find((element) => element.valor === 'as') !=
        undefined
      ) {
        const cartasConAses = this.jugada.cartasCroupier.filter(this.tieneAs);
        cartasConAses.forEach((i) => {
          if (puntos > 21) {
            puntos -= 10;
          }
        });
      }
      this.jugada.puntajeCroupier = puntos;
    } else if (jugador === 'jugador') {
      this.jugada.cartasUsuario.forEach((carta) => {
        puntos += carta.valorJuego;
      });

      if (
        this.jugada.cartasUsuario.find((element) => element.valor === 'as') !=
        undefined
      ) {
        const cartasConAses = this.jugada.cartasUsuario.filter(this.tieneAs);
        cartasConAses.forEach((i) => {
          if (puntos > 21) {
            puntos -= 10;
          }
        });
      }
      this.jugada.puntajeUsuario = puntos;
      if (this.jugada.puntajeUsuario > 21) {
        setTimeout(() => {
          this.alerta('error', 'Perdiste!')
          this.jugada.gano= false;
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
    while (this.jugada.puntajeCroupier < 17) {
     this.obtenerCartas('croupier');
    }
    if (
      this.jugada.puntajeCroupier < 22 &&
      this.jugada.puntajeCroupier > this.jugada.puntajeUsuario
    ) {
      this.alerta('error', 'Perdiste!');
      this.jugada.gano= false;
    } else if (
      this.jugada.puntajeCroupier < 22 &&
      this.jugada.puntajeCroupier < this.jugada.puntajeUsuario
    ) {
      if (this.blackJackJugador()) {
        this.alerta('success', 'Ganaste con un Blackjack!')
        this.jugada.gano= true;
      } else {
        this.alerta('success', 'Ganaste!');
        this.jugada.gano= true;
      }
    } else if (
      this.jugada.puntajeCroupier < 22 &&
      this.jugada.puntajeCroupier === this.jugada.puntajeUsuario
    ) {
      if (this.blackJackJugador()) {
        this.alerta('success', 'Ganaste con un Blackjack!')
        this.jugada.gano= true;
      } else {
        this.alerta('warning', 'Empate!')
        this.jugada.gano= false;
      }
    } else if (this.jugada.puntajeCroupier > 21) {
      this.alerta('success', 'Ganaste!')
      this.jugada.gano= true;
    }
  }

  blackJackJugador() {
    return this.jugada.cartasUsuario.length === 2 && this.jugada.puntajeUsuario === 21;
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
