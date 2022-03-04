import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }
  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean>{
    const user = await this.auth.getUser();
    if(!user){
      return this.router.navigateByUrl('/login').then(() => false);
    }
    return true;
  }
}
