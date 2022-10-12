import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario = {} as Usuario;
  constructor(private authService: AuthService, private route: Router) { }
  error: boolean;
  ngOnInit(): void {
  }

  loguear(){
    this.authService.login(this.usuario).subscribe({
      next: (user) => {
        console.log(user);
        localStorage.setItem('token', user.JWT);
        localStorage.setItem('usuarioId', user.usuario.id);
        this.route.navigate(['/home'])

      },
      error: () => {
        console.log('error');
        this.error = true;
      }
    })
  }

}
