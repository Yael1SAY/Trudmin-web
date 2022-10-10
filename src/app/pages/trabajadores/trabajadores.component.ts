import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { PaginationModel } from 'src/app/model/paginationModel';
import { AuthService } from 'src/app/services/auth.service';
import { ExportService } from 'src/app/services/export.service';
import { TrabajadoresService } from 'src/app/services/trabajadores.service';

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.css']
})
export class TrabajadoresComponent implements OnInit {

  public trabajadores:    any[]             = [];
  public step:            number            = 0;
  public length:          number            = 100;
  public pageSize:        number            = 5;
  public pagination:      PaginationModel;
  public pageSizeOptions: number[]          = [5, 10, 25, 100];
  public pageEvent:       PageEvent;

  public filtros: any = {
    clave: ''
  };

  constructor(private trabajadoresService: TrabajadoresService, 
    private authService: AuthService,
    private router: Router,
    private exportDataExcel: ExportService
    ) { }

  ngOnInit(): void {
    if(!this.authService.isAuthtenticated()){
      this.router.navigate(['/login']);
    }
    // this.llamarMetodoBuscarUsuarios();
  }

  // llamarMetodoBuscarUsuarios() {
  //   this.page = 0;
  //   this.pageSize = 40;
  //   this.BuscarTrabajador()
  // }

  BuscarTrabajador() {
    this.trabajadoresService.obtenerTrabajadores(this.authService.getRol()).subscribe(trabajadores =>{
      this.trabajadores = trabajadores;
      console.log(this.trabajadores);
    });
  }

  // buscarPorPagina(event: any) {
  //   this.page = event.page;
  //   this.pageSize = event.rows;
  //   this.BuscarTrabajador();
  //   //console.log("Pagina: ", event);
  // }

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

  getPaginatorData(event){
    this.pagination = {
      page: event.pageIndex,
      size: event.pageSize,
    }
    // this.store.dispatch(GET_LIST_PRODUCTIVIDADES({pagination: this.pagination}));

    return event;
    
  }

  export() {
    console.log('Exportar datos a Excel: ', this.trabajadores);
    this.exportDataExcel.exportAsExcelFile(this.trabajadores, 'Lista_servicios');
  }



}
