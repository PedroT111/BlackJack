import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CardsService {
  cards = ['2C', '2D', '2H', '2S',
    '3C', '3D', '3H', '3S',
    '4C', '4D', '4H', '4S',
    '5C', '5D', '5H', '5S',
    '6C', '6D', '6H', '6S',
    '7C', '7D', '7H', '7S',
    '8C', '8D', '8H', '8S',
    '9C', '9D', '9H', '9S',
    '10C', '10D', '10H', '10S',
    'JC', 'JD', 'JH', 'JS',
    'QC', 'QD', 'QH', 'QS',
    'KC', 'KD', 'KH', 'KS',
    'AC', 'AD', 'AH', 'AS'];

  cardsDisponibles: any= [];
  dealerCards: any=[];
  userCards: any = [];

  constructor() { 
    this.cardsDisponibles = this.cards.slice();
  }

  getCardRandom(tipoUser: string){
    const card = this.cardsDisponibles.splice(Math.floor(Math.random()*this.cardsDisponibles.length),1)[0];
    if(tipoUser == 'user'){
      this.userCards.push(card);
    } else{
      this.dealerCards.push(card);
    }
    return card;
  }
}
