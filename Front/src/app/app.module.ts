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
import { LoginComponent } from './components/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import { RegistroComponent } from './components/registro/registro.component';
import { AuthService } from 'src/services/auth.service';
import { AuthGuard } from './middleware/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { JugadaService } from 'src/services/jugada.service';

@NgModule({
  declarations: [
    AppComponent,
    DealerComponent,
    PlayerComponent,
    GameComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [CardsService, AuthService, AuthGuard, JugadaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
