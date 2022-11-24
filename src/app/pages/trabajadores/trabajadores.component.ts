import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PaginationModel } from 'src/app/model/paginationModel';
import { Trabajadores } from 'src/app/model/trabajadores';
import { AuthService } from 'src/app/services/auth.service';
import { ExportService } from 'src/app/services/export.service';
import { TrabajadoresService } from 'src/app/services/trabajadores.service';
import { AltaTrabajadorComponent } from './alta-trabajador/alta-trabajador.component';
import { OBTENER_TRABAJADORES } from './store/acctions/trabajadores.actions';
import { appTrabajadoresState } from './store/appTrabajadores.reducers';

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.css']
})
export class TrabajadoresComponent implements OnInit {

  public trabajadores: Trabajadores[];
  public step: number = 0;
  public length: number = 100;
  public pageSize: number = 5;
  public pagination: PaginationModel;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public pageEvent: PageEvent;

  listatrabajadores$ = this.store.select('listTrabajadores');

  public filtros: any = {
    clave: ''
  };

  constructor(private trabajadoresService: TrabajadoresService,
    private authService: AuthService,
    private router: Router,
    private exportDataExcel: ExportService,
    private store: Store<appTrabajadoresState>,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    if (!this.authService.isAuthtenticated()) {
      this.router.navigate(['/login']);
    }

    this.pagination = {
      size: 5,
      page: 0
    }

    this.listatrabajadores$.subscribe(resp => {
      console.log(resp);
      this.trabajadores = resp.dataGet.content;
      this.length = resp.dataGet.totalElements;
    })

    this.store.dispatch(OBTENER_TRABAJADORES({ pagination: this.pagination }));


    // this.llamarMetodoBuscarUsuarios();
  }

  // llamarMetodoBuscarUsuarios() {
  //   this.page = 0;
  //   this.pageSize = 40;
  //   this.BuscarTrabajador()
  // }

  BuscarTrabajador() {
    // this.trabajadoresService.obtenerTrabajadores(this.authService.getRol()).subscribe(trabajadores =>{
    //   this.trabajadores = trabajadores.content;
    //   console.log(this.trabajadores);
    // });
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

  getPaginatorData(event) {
    this.pagination = {
      page: event.pageIndex,
      size: event.pageSize,
    }
    this.store.dispatch(OBTENER_TRABAJADORES({ pagination: this.pagination }));

    return event;

  }

  export() {
    console.log('Exportar datos a Excel: ', this.trabajadores);
    this.exportDataExcel.exportAsExcelFile(this.trabajadores, 'Lista_servicios');
  }

  altaTrabajadorDialog() {
    const dialogRef = this.dialog.open(AltaTrabajadorComponent, {
       width: '900px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.store.dispatch(OBTENER_TRABAJADORES({ pagination: this.pagination }));
    });
  }



}
