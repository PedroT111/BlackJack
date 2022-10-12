import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private route: Router){}

  canActivate():boolean{
    if(this.authService.isLoggedIn()){
      return true;
    } else{
      this.route.navigate(['/']);
      return false;
    }
  }
  
}