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

  constructor(private serviceCard: CardsService) {}

  ngOnInit(): void {}

  get puntajeCroupier() {
    return this.serviceCard.puntajeCroupier;
  }

  get cartas() {
    return this.serviceCard.cartasCroupier;
  }
  /*getCard(){
    this.onGetCard.emit();
  }*/
}
