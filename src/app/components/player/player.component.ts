import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() cards: any = [];
  @Output() onGetCard = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  getCard(){
    this.onGetCard.emit();
  }

}
