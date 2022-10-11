import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DealerComponent } from './components/dealer/dealer.component';
import { PlayerComponent } from './components/player/player.component';
import { GameComponent } from './components/game/game.component';
import { FormsModule } from '@angular/forms';
import { CardsService } from 'src/services/cards.service';
import { HeaderComponent } from './components//header/header.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    DealerComponent,
    PlayerComponent,
    GameComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [CardsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
