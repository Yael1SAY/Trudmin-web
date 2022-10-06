import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private httpHeader = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token != null){
      return this.httpHeader.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeader;
  }

  private isNoAutorizado(e: any): boolean{
    if(e.status==401){//realiza la validacion cuando no se a autenticado
      if(this.authService.isAuthtenticated!){
        this.authService.logout();
      }
      swal.fire('Acceso Denegado','Se requiere iniciar sesión','warning')
      this.router.navigate(['/login'])
      return true;
    }
    if(e.status==403){//Acceso denegado por el tipo de rol
      swal.fire('Acceso Denegado','Hola ' + this.authService.comprador.nombre + ' no tienes acceso a este recurso','warning')
      this.router.navigate(['/clientes'])
      return true;
    }
    return false;
  }

  obtenerUsarios(): Observable<any>{
    let page: number = 0;
    let size: number = 4;
    return this.http.get<any>(`${URL}usuario/obtenerUsuarios/page/${page}/${size}`, {headers: this.agregarAuthorizationHeader()})
    // .pipe(
    //   catchError(e =>{
    //     if(e.status==0){
    //       this.router.navigate(['/login']);
    //       swal.fire("Servicio fuera de linea", 'No es posible conectar al servicio, contacte al administrador','error');
    //       return throwError(() => e);
    //     }
    //     if(e.status==401){//realiza la validacion cuando no se a autenticado
    //       this.router.navigate(['/login'])
    //       return throwError(() => e);
    //     }
    //     //return map(response => response as Comprador[])
    //     return throwError(() => e);
    //   })
    // );
  }

  registrarUsuario(usuario: Usuario){
    return this.http.post<Usuario>(`${URL}usuario/crearUsuario`, usuario, {headers: this.agregarAuthorizationHeader()})
    // .pipe(
    //   catchError(e=> {
    //     if(e.status==0){
    //       this.router.navigate(['/login']);
    //       swal.fire("Servicio fuera de linea", 'No es posible conectar al servicio, contacte al administrador','error');
    //       return throwError(() => e);
    //     }
    //     if(e.status==401){//realiza la validacion cuando no se a autenticado
    //       this.router.navigate(['/login'])
    //       return throwError(() => e);
    //     }
    //     //return map(response => response as Comprador[])
    //     return throwError(() => e);
    //   })
    // )
  }
}
