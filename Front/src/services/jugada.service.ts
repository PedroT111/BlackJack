import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jugada } from 'src/app/models/jugada';


@Injectable({
  providedIn: 'root'
})
export class JugadaService {
  private url: string= 'http://localhost:4000/';
  private token:string | null = "";
  constructor(private http: HttpClient) {
    this.token =localStorage.getItem('token');
  }
  consultarUltimaJugada(idUsuario:number):Observable<any>{
    return this.http.get(`${this.url}jugadas/ultima/${idUsuario}`, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }
  nuevaJugada(idUsuario: number, cantMazos: number):Observable<any>{
    return this.http.post(`${this.url}jugadas/nueva`,{
      "UsuarioId": idUsuario,
      "cantMazos": cantMazos
    }, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    } );
  }

  retirarCarta(idMazo: number, cantidad: number):Observable<any>{
    return this.http.put(`${this.url}mazo/retirar`,{
        "id": idMazo,
        "cartas":  cantidad
    }, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    })
  }

  editarJugada(jugada:Jugada):Observable<any>{
    return this.http.put(`${this.url}jugadas/actualizar`, jugada, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }

}
