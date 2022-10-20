import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Carta } from 'src/app/models/carta';
import { CardsService } from 'src/services/cards.service';

@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.css'],
})
export class DealerComponent implements OnInit {
  @Input() banderaInicio: boolean;
  @Input() cartas: any[]= []; 
  @Input() puntajeCroupier: number;
  constructor() {}

  ngOnInit(): void {}
}
