import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.css']
})
export class DealerComponent implements OnInit {

  @Input() cards: any = [];
  @Output() onGetCard = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  getCard(){
    this.onGetCard.emit();
  }

}
