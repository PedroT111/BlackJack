import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardsService } from 'src/services/cards.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }


  iniciarJuego(){
    this.route.navigate(['game'])
  }

  reportes(){
    this.route.navigate(['reportes'])
  }

}
