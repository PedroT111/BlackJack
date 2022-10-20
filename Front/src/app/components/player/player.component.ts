import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  constructor() {}

  ngOnInit(): void {}
  getCard() {
    this.onGetCard.emit('jugador');
  }

  plantarse() {
    this.onPlantarse.emit();
    console.log(this.flagInicio)
  }

  reiniciar() {
    this.onReiniciar.emit();
  }
}
