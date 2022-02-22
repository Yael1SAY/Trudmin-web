import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductividadService } from 'src/app/services/productividad.service';

@Component({
  selector: 'app-productividad',
  templateUrl: './productividad.component.html',
  styleUrls: ['./productividad.component.css']
})
export class ProductividadComponent implements OnInit {

  listaEmpleados: any;
  periodos: any;
  meses: any;
  anios: any;
  servicios: any[] = [];
  first = 0;
  rows = 10;
  step = 0;
  page = 0;
  totalPage: number | undefined;
  totalElements: number | undefined;
  pageSize: Number = 40;

  constructor(private authService: AuthService, private productividad: ProductividadService,
    private router: Router) { }

  ngOnInit(): void {
    if(!this.authService.isAuthtenticated()){
      this.router.navigate(['/login']);
    }
    this.BuscarServicios()
  }

  llamarMetodoBuscarServicios() {
    this.page = 0;
    this.pageSize = 40;
    this.BuscarServicios()
  }

  BuscarServicios() {
    this.productividad.obtenerServicios().subscribe(servicios =>{
      console.log("respuesta: ", servicios)
      this.servicios = servicios;
      console.log(this.servicios);
    });
  }

  buscarPorPagina(event: any) {
    this.page = event.page;
    this.pageSize = event.rows;
    this.BuscarServicios();
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
    return this.servicios ? this.first === (this.servicios.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.servicios ? this.first === 0 : true;
  }

}
