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
          console.log('no terminada')
          console.log(this.jugada)
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
    console.log('nueva')
    this.subscription.add(this.jugadaService.nuevaJugada(this.cantMazos).subscribe({
      next: (res) => {
        this.jugada = res.jugada;
        console.log(this.jugada)
        this.repartirCartas();
      },
      error: () => {
        console.log('Error');
      }
    }))
  }

  repartirCartas(){
    console.log(this.jugada)
    this.subscription.add(this.jugadaService.editarJugada(this.jugada.id, 'jugador', 2).subscribe({
      next: (res) => {
        if(res.blackjack){
          this.alerta('success','blackjack');
        }
      },
      error: () => {
        console.log('error');
      }
    }));
    this.subscription.add(this.jugadaService.editarJugada(this.jugada.id, 'croupier', 2).subscribe({
      next: (res) => {
        this.jugada.cartasCroupier = res.cartasCroupier;
        this.jugada.cartasUsuario = res.cartasUsuario;
        this.jugada.puntajeCroupier = res.puntajeCroupier;
        this.jugada.puntajeUsuario = res.puntajeUsuario;
        this.jugada.gano = res.gano;
      },
      error: () => {
        console.log('error');
      }
    }));
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

  //Se hace un bucle infinito
  async plantarse(){
    console.log('plantado')
   while(this.jugada.puntajeCroupier < 17){
      const data = await this.jugadaService.editarJugada(this.jugada.id, 'croupier', 1).toPromise();
      this.jugada.puntajeCroupier = data.puntajeCroupier;
      
    }
  }
  

  //alerta
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
