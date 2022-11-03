import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
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
  cantMazos: number = 2;
  jugada = {} as Jugada;
  cartasRetirada: any[] = [];
  subscription: Subscription = new Subscription();

  constructor(private jugadaService: JugadaService) {
  }
  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.consultarUltimaJugada();
  }

  consultarUltimaJugada(){
    this.subscription.add(this.jugadaService.consultarUltimaJugada().subscribe({
      next:(res) => {
        if(res.jugada != null){
          this.jugada = res.jugada;
        } else{
          this.crearJugadaNueva();
        }
      },
      error: () => {
        console.log('Error');
      }
    }))
  }

  crearJugadaNueva(){
    this.subscription.add(this.jugadaService.nuevaJugada(this.cantMazos).subscribe({
      next: (res) => {
        this.jugada = res.jugada;
        this.repartirCartas();
      },
      error: () => {
        console.log('Error');
      }
    }))
  }

  repartirCartas(){
    this.subscription.add(this.jugadaService.editarJugada(this.jugada.id, 'jugador', 2).subscribe({
      next: (res) => {
        this.jugada.cartasUsuario = res.cartasUsuario;
        this.jugada.puntajeUsuario = res.puntajeUsuario;
        if(res.blackjack){
          this.alerta('success','blackjack');
        }
      },
      error: () => {
        console.log('error');
      }
    }));
    setTimeout(() => {
      this.subscription.add(this.jugadaService.editarJugada(this.jugada.id, 'croupier', 2).subscribe({
        next: (res) => {
          console.log(res, 'res')
          this.jugada.cartasCroupier = res.cartasCroupier;
          this.jugada.puntajeCroupier = res.puntajeCroupier;
        },
        error: () => {
          console.log('error');
        }
      }));
    }, 2000);
  }

  pedirCarta(){
    this.subscription.add(this.jugadaService.editarJugada(this.jugada.id, 'jugador', 1).subscribe({
      next: (res) => {
        this.jugada.cartasUsuario = res.cartasUsuario;
        this.jugada.puntajeUsuario = res.puntajeUsuario;
        this.jugada.resultado = res.resultado;
        this.jugada.terminada = res.terminada;
        
        if(res.terminada){
          this.alerta('success', res.resultado);
        }
      },
      error: () => {
        console.log('error');
      }
    }))
  };

  async plantarse(){
   while(this.jugada.puntajeCroupier < 17){
      const data = await this.jugadaService.editarJugada(this.jugada.id, 'croupier', 1).toPromise();
      this.jugada.cartasCroupier = data.cartasCroupier;
      this.jugada.puntajeCroupier = data.puntajeCroupier;
      this.jugada.resultado = data.resultado;
    }
    this.alerta('success', this.jugada.resultado);
  }

  terminar(){
    this.jugadaService.terminarJugada(this.jugada.id).subscribe({
      next: (res) => {
        this.crearJugadaNueva();
      },
      error: () => {
        console.log('error');
      }
    })
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
