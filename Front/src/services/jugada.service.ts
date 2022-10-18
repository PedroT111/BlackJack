import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JugadaService {
  private urlapi: string = "http://localhost:4000/jugadas/nueva";
  constructor(private http: HttpClient) { }

  nuevaJugada(idUsuario: number, cantMazos: number):Observable<any>{
    return this.http.post(this.urlapi,{
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
}
