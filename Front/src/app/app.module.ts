import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DealerComponent } from './components/dealer/dealer.component';
import { PlayerComponent } from './components/player/player.component';
import { GameComponent } from './components/game/game.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components//header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import { RegistroComponent } from './components/registro/registro.component';
import { AuthService } from 'src/services/auth.service';
import { AuthGuard } from './middleware/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { JugadaService } from 'src/services/jugada.service';
import { ReportesComponent } from './components/reportes/reportes.component';
import { NgChartsModule } from 'ng2-charts';
import { Rpt1Component } from './components/rpt1/rpt1.component';
import { ReportesService } from 'src/services/reportes.service';
import { Rpt2Component } from './components/rpt2/rpt2.component';
import { Rpt3Component } from './components/rpt3/rpt3.component';


@NgModule({
  declarations: [
    AppComponent,
    DealerComponent,
    PlayerComponent,
    GameComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    ReportesComponent,
    Rpt1Component,
    Rpt2Component,
    Rpt3Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  providers: [AuthService, AuthGuard, JugadaService, ReportesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
