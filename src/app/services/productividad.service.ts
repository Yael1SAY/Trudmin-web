import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import swal from 'sweetalert2';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ProductividadService {

  private httpHeader = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token != null){
      return this.httpHeader.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeader;
  }

  obtenerServicios(): Observable<any[]>{
    return this.http.get<any[]>(`${URL}servicio/obtenerServicios`, {headers: this.agregarAuthorizationHeader()})
    .pipe(
      catchError(e =>{
        if(e.status==0){
          this.router.navigate(['/login']);
          swal.fire("Servicio fuera de linea", 'No es posible conectar al servicio, contacte al administrador','error');
          return throwError(() => e);
        }
        if(e.status==401){//realiza la validacion cuando no se a autenticado
          this.router.navigate(['/login'])
          return throwError(() => e);
        }
        //return map(response => response as Comprador[])
        return throwError(() => e);
      })
    );
  }
}
