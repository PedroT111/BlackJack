import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    usuario: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  usuario: Usuario;
  constructor(private authService: AuthService, private route: Router) { }
  error: boolean;
  ngOnInit(): void {
  }

  loguear(){
    this.usuario = this.form.value;
    console.log(this.usuario);
    this.authService.login(this.usuario).subscribe({
      next: (res) => {
        if(res.error){
          this.error= true;
          return;
        }
        localStorage.setItem('token', res.JWT);
        localStorage.setItem('usuarioId', res.usuario.id);
        this.route.navigate(['/home'])

      },
      error: () => {
        console.log('error');
        this.error = true;
      }
    })
  }

}
