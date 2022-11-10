import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Carta } from 'src/app/models/carta';
import { CardsService } from 'src/services/cards.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  @Output() onGetCard = new EventEmitter();
  @Output() onPlantarse = new EventEmitter();
  @Output() onReiniciar = new EventEmitter();
  @Input() flagInicio: boolean;
  @Input() cartas: any[] = [];
  @Input() puntajeUsuario: number;
  @Input() bloquear: boolean;
  constructor(private route: Router) {}

  ngOnInit(): void {}
  getCard() {
    this.onGetCard.emit('jugador');
  }

  plantarse() {
    this.onPlantarse.emit();
  }

  reiniciar() {
    this.onReiniciar.emit();
  }

  salir() {
    this.route.navigate(['/home']);
  }
}
