import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Bono } from '../model/bono';
import { GenericResponse } from '../model/generic-response';
import { AuthService } from './auth.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class MisBonosService {

  private httpHeader = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private authService: AuthService) { }

  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeader.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeader;
  }

  obtenerMisBonos(anio: number, empleadoId: number) {
    return this.http.get<GenericResponse<Bono>>(`${URL}bonos/obtenerBonosPorEmpleadoYAnio/${anio}/${empleadoId}`, { headers: this.agregarAuthorizationHeader() })
  }
}
