import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TrabajadoresService } from 'src/app/services/trabajadores.service';

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.css']
})
export class TrabajadoresComponent implements OnInit {

  trabajadores: any[] = [];
  first = 0;
  rows = 10;
  step = 0;
  page = 0;
  totalPage: number | undefined;
  totalElements: number | undefined;
  pageSize: Number = 40;

  public filtros: any = {
    clave: ''
  };

  constructor(private trabajadoresService: TrabajadoresService, private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if(!this.authService.isAuthtenticated()){
      this.router.navigate(['/login']);
    }
    this.llamarMetodoBuscarUsuarios();
  }

  llamarMetodoBuscarUsuarios() {
    this.page = 0;
    this.pageSize = 40;
    this.BuscarTrabajador()
  }

  BuscarTrabajador() {
    this.trabajadoresService.obtenerTrabajadores(this.authService.getRol()).subscribe(trabajadores =>{
      this.trabajadores = trabajadores;
      console.log(this.trabajadores);
    });
  }

  buscarPorPagina(event: any) {
    this.page = event.page;
    this.pageSize = event.rows;
    this.BuscarTrabajador();
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
    return this.trabajadores ? this.first === (this.trabajadores.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.trabajadores ? this.first === 0 : true;
  }


}
