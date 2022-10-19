import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JugadaService {
  constructor(private http: HttpClient) { }

  nuevaJugada(idUsuario: number, cantMazos: number):Observable<any>{
    return this.http.post('http://localhost:4000/jugadas/nueva',{
      "UsuarioId": idUsuario,
      "cantMazos": cantMazos
    } );
  }

  retirarCarta(idMazo: number, cantidad: number):Observable<any>{
    return this.http.put('http://localhost:4000/mazo/retirar',{
        "id": idMazo,
        "cartas":  cantidad
    })
  }

  editarJugada(idJugada: number,puntajeCroupier: number, puntajeJugador: number, cartasCroupier: any[], cartasJugador: any[], gano: boolean, terminada: boolean):Observable<any>{
    return this.http.put('http://localhost:4000/jugadas/actualizar', {
      "JugadaId": idJugada,
      "puntajeCroupier": puntajeCroupier,
      "puntajeUsuario": puntajeJugador,
      "cartasCroupier": cartasCroupier,
      "cartasUsuario": cartasJugador,
      "gano": gano,
      "terminada": terminada
    });
  }

}
