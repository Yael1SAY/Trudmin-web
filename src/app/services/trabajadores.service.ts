import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import swal from 'sweetalert2';
import { PaginationModel } from '../model/paginationModel';
import { GenericResponse } from '../model/generic-response';
import { Trabajadores } from '../model/trabajadores';
import { AltaTrabajador } from '../model/altaTrabajador';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class TrabajadoresService {

  private httpHeader = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token != null){
      return this.httpHeader.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeader;
  }

  obtenerTrabajadores(pagination: PaginationModel): Observable<GenericResponse<Trabajadores>>{
    return this.http.get<GenericResponse<Trabajadores>>(`${URL}empleado/obtenerEmpleados/page/${pagination.page}/${pagination.size}`, {headers: this.agregarAuthorizationHeader()})
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

  altaTrabajador(trabajador: AltaTrabajador) {
    return this.http.post<GenericResponse<Trabajadores>>(`${URL}empleado/altaEmpleado`, trabajador, {headers: this.agregarAuthorizationHeader()})
  }
}
