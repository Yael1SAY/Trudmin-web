import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import swal from 'sweetalert2';
import { clavesEmpleado } from '../model/ClavesEmpleado';
import { CatalogoUsuarios } from '../model/catalogo-usuarios';
import { CatalogoPuestos } from '../model/catalogo-puestos';
import { CatalogoSubareras } from '../model/catalogo_subareas'

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  private httpHeader = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeader.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeader;
  }

  obtenerServicios(): Observable<clavesEmpleado[]> {
    return this.http.get<clavesEmpleado[]>(`${URL}catalogos/clavesEmpleado`, { headers: this.agregarAuthorizationHeader() })
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

  public obtenerCatalogoUsuarios(): Observable<CatalogoUsuarios[]> {
    return this.http.get<CatalogoUsuarios[]>(`${URL}catalogos/catalogoUsuarios`, { headers: this.agregarAuthorizationHeader() })
  }

  public obtenerCatalogoPuestos(): Observable<CatalogoPuestos[]> {
    return this.http.get<CatalogoPuestos[]>(`${URL}catalogos/puestos`, { headers: this.agregarAuthorizationHeader() })
  }

  public obtenerCatalogoSubareas(): Observable<CatalogoSubareras[]> {
    return this.http.get<CatalogoSubareras[]>(`${URL}catalogos/subAreas`, { headers: this.agregarAuthorizationHeader() })
  }
}
