import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../model/usuario'
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario | undefined;
  private _token: string | undefined;

  constructor(private http: HttpClient) { }

  public get comprador(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')!) as Usuario;
      return this._usuario!;
    }
    return new Usuario;
  }
  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token')!;
      return this._token;
    }
    return null!;
  }

  login(comprador: Usuario): Observable<any> {
    //const urlEndPoint = 'http://localhost:8080/oauth/token';
    const credenciales = btoa('angularapp' + ':' + '12345');
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', comprador.nombreUsuario);
    params.set('password', comprador.password);
    console.log("parametros: ", params.toString())
    return this.http.post<any>(`${URL}oauth/token`, params.toString(), { headers: httpHeaders });
  }

  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerPayload(accessToken);
    var listRol: String[] = [];
    this._usuario = new Usuario();
    this._usuario.nombre = payload.nombre;
    this._usuario.apellidoPaterno = payload.apellidoPaterno;
    this._usuario.apellidoMaterno = payload.apellidoMaterno;
    this._usuario.nombreUsuario = payload.user_name;
    this._usuario.email = payload.email;
    for (let rol in payload.authorities) {
      listRol.push(payload.authorities[rol])
    }
    this._usuario.roles = listRol;
    //almacena los datos del usuario en la sesion
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario))
    //stringify: convierte tipo objeto a JSON
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    //almacena el token en la sesion
    sessionStorage.setItem('token', accessToken)
  }

  obtenerPayload(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split('.')[1]))
    }
    return null;
  }

  isAuthtenticated(): boolean {
    let payload = this.obtenerPayload(this.token);//metodo getter y no _token
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  getRol(): string {
    var rol = ""
    let payload = this.obtenerPayload(this.token);
    if (payload != null) {
      for (let item in payload.authorities) {
        rol = payload.authorities[item];
      }
    }
    return rol;
  }

  logout(): void {
    this._token = null!;
    this._usuario = null!;
    sessionStorage.clear;
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }

}
