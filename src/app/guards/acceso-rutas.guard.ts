import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccesoRutasGuard implements CanActivate {

  constructor(private router:Router, private authService: AuthService){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let rol: any = this.authService.comprador.roles[0];
      console.log("Rol: ", rol);
      if(rol==="ROLE_USER") {
        this.router.navigate(['pages/inicio']);
        console.log("NO TIENE ACCESO A ESTE COMPONENTE");
        return false;
      }
    return true;
  }

  
  
  
}
