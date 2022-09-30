import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  @Input() cards: any = [];
  @Input() puntajeUsuario: number;
  @Output() onGetCard = new EventEmitter();
  @Output() onPlantarse = new EventEmitter();
  @Output() onReiniciar = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  getCard() {
    this.onGetCard.emit();
  }

  plantarse(){
    this.onPlantarse.emit();
  }

  reiniciar(){
    this.onReiniciar.emit();
  }

}
