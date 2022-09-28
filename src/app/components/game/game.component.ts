import { Component, Input, OnInit } from '@angular/core';
import { CardsService } from 'src/services/cards.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  userCards: any = [];
  dealerCards: any = [];

  constructor(private serviceCard: CardsService) { }

  ngOnInit(): void {
  }

  getCardsDealer(){
    const card = this.serviceCard.getCardRandom('dealer');
    this.dealerCards.push(card);
  }

  getCardsUser(){
    const card = this.serviceCard.getCardRandom('user');
    this.userCards.push(card);
  }

}
