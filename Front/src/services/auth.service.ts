import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';

@Injectable()
export class AuthService {
  private url: String = 'localhost:4000/usuarios/login';
  constructor(private http: HttpClient) { }

  login(usuario: Usuario):Observable<any>{
    return this.http.post('http://localhost:4000/usuarios/login',usuario);
  }

  signup(usuario: Usuario):Observable<any>{
    return this.http.post('http://localhost:4000/usuarios/registro', usuario);
  }
}
