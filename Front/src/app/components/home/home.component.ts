import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardsService } from 'src/services/cards.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: Router, private cardService: CardsService) { }

  ngOnInit(): void {
    this.cargarCartas();
  }
  cargarCartas(){
    this.cardService.getCartasDesdeApi().subscribe({
      next: (cartas) => {
        console.log(cartas, 'cartas');
      },
      error: () => {

      }
    });
  }

  iniciarJuego(){
    this.route.navigate(['game'])
  }

}
