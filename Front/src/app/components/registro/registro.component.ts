import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario = {} as Usuario;
  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  registrar(){
    this.authService.signup(this.usuario).subscribe({
      next: (res) => {
        alert("Bienvenido " + res.usuario.usuario);
        this.route.navigate(['/'])
      },
      error: () => {
        console.log('error');
      }
    })
  }

}
