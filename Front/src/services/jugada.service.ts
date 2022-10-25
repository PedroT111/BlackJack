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
  private usuarioId: string | null = "";
  constructor(private http: HttpClient) {
    this.token =localStorage.getItem('token');
    this.usuarioId = localStorage.getItem('usuarioId');
  }
  consultarUltimaJugada():Observable<any>{
    return this.http.get(`${this.url}jugadas/ultima/${this.usuarioId}`, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }
  nuevaJugada(cantMazos: number):Observable<any>{
    return this.http.post(`${this.url}jugadas/nueva`,{
      "UsuarioId": this.usuarioId,
      "cantMazos": cantMazos
    }, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    } );
  }

  editarJugada(jugadaId: number, participante: string, cantCartas: number):Observable<any>{
    return this.http.put(`${this.url}jugadas/actualizar`, {
      "JugadaId": jugadaId,
      "participante": participante,
      "cantCartas": cantCartas
  },{
    headers: {
      'Authorization': `Bearer ${this.token}`
    }
  });
  }

}
