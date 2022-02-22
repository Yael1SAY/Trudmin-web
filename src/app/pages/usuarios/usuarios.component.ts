import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  first = 0;
  rows = 10;
  step = 0;
  page = 0;
  totalPage: number | undefined;
  totalElements: number | undefined;
  pageSize: Number = 40;

  constructor(private usuarioService: UsuarioService, private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.authService.isAuthtenticated()) {
      this.router.navigate(['/login']);
    }
    this.BuscarUsuarios();
  }

  llamarMetodoBuscarUsuarios() {
    this.page = 0;
    this.pageSize = 40;
    this.BuscarUsuarios()
  }

  BuscarUsuarios() {
    this.usuarioService.obtenerUsarios(this.authService.getRol()).subscribe(
      usuarios => this.usuarios = usuarios
    );
  }

  buscarPorPagina(event: any) {
    this.page = event.page;
    this.pageSize = event.rows;
    this.BuscarUsuarios();
    //console.log("Pagina: ", event);
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  public filtros: any = {
    clee: '',
    nombre: ''
  };

  BuscarUusario() {
    console.log("Buscar usuario");
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.usuarios ? this.first === (this.usuarios.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.usuarios ? this.first === 0 : true;
  }

  mostrar(){
    console.log("Mostrar")
  }

}
