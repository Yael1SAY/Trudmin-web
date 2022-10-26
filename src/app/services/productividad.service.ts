import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import swal from 'sweetalert2';
import { Productividad } from '../model/productividad';
import { PaginationModel } from '../model/paginationModel';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ProductividadService implements HttpInterceptor {

  private httpHeader = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('token');
    //console.log("token: ", token);

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        //console.log("Error intercept: ", err);

        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        }

        return throwError( () => err );

      })
    );
  }

  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeader.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeader;
  }

  obtenerProductividades() {
    return this.http.get<any>(`${URL}servicio/obtenerServicios`, { headers: this.agregarAuthorizationHeader() });
  }

  obtenerProductividadesPage(pagination: PaginationModel) {
    return this.http.get<any>(`${URL}servicio/obtenerServicios/page/${pagination.page}/${pagination.size}`, { headers: this.agregarAuthorizationHeader() });
  }

  obtenerServicios(empleadoId: number, anio: number): Observable<any[]> {
    return this.http.get<any[]>(`${URL}servicio/obtenerServiciosPorCompradorAnio?anio=${anio}&empleadoId=${empleadoId}`, { headers: this.agregarAuthorizationHeader() })
      // .pipe(
      //   catchError(e => {
      //     if (e.status == 0) {
      //       this.router.navigate(['/login']);
      //       swal.fire("Servicio fuera de linea", 'No es posible conectar al servicio, contacte al administrador', 'error');
      //       return throwError(() => e);
      //     }
      //     if (e.status == 401) {//realiza la validacion cuando no se a autenticado
      //       this.router.navigate(['/login'])
      //       return throwError(() => e);
      //     }
      //     //return map(response => response as Comprador[])
      //     return throwError(() => e);
      //   })
      // );
  }

  altaDeProductividad(productividad: Productividad) {
    console.log('Datos a insertar: ', productividad);
    return this.http.post<any>(`${URL}servicio/crearServicio`, productividad, { headers: this.agregarAuthorizationHeader() })
      // .pipe(
      //   catchError(e => {
      //     if (e.status == 0) {
      //       this.router.navigate(['/login']);
      //       swal.fire("Servicio fuera de linea", 'No es posible conectar al servicio, contacte al administrador', 'error');
      //       return throwError(() => e);
      //     }
      //     if (e.status == 401) {//realiza la validacion cuando no se a autenticado
      //       this.router.navigate(['/login'])
      //       return throwError(() => e);
      //     }
      //     //return map(response => response as Comprador[])
      //     return throwError(() => e);
      //   })
      //)
  }

  eliminarRegistro(servicioId) {
    return this.http.delete<any[]>(`${URL}servicio/bajaServicio/${servicioId}`, { headers: this.agregarAuthorizationHeader() })
    .pipe(
      catchError(e => {
        if (e.status == 0) {
          this.router.navigate(['/login']);
          swal.fire("Servicio fuera de linea", 'No es posible conectar al servicio, contacte al administrador', 'error');
          return throwError(() => e);
        }
        if (e.status == 401) {//realiza la validacion cuando no se a autenticado
          this.router.navigate(['/login'])
          return throwError(() => e);
        }
        //return map(response => response as Comprador[])
        return throwError(() => e);
      })
    )
  }

  obtenerProductividadEficiencia(filtros: any) {
    return this.http.get<any>(`${URL}servicio/obtenerServiciosProductividad/${filtros.filtros.empleadoId}/${filtros.filtros.anio}`,
    { headers: this.agregarAuthorizationHeader() })
  }
}
