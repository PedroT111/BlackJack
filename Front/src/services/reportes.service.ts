import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ReportesService {
  private url: string= 'http://localhost:4000/';
  private token:string | null = "";
  private usuarioId: string | null = "";

  constructor(private http: HttpClient) { 
    this.token =localStorage.getItem('token');
    this.usuarioId = localStorage.getItem('usuarioId');
  }

  reporte1():Observable<any>{
    return this.http.get(`${this.url}reportes/reporte1/${this.usuarioId}`,{
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }

  reporte2():Observable<any>{
    return this.http.get(`${this.url}reportes/reporte2/${this.usuarioId}`,{
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }

  reporte3():Observable<any>{
    return this.http.get(`${this.url}reportes/reporte3/${this.usuarioId}`,{
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }


}
