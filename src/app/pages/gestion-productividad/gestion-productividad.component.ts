import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Productividad } from '../../model/productividad';
import { clavesEmpleado } from '../../model/ClavesEmpleado';
import { AuthService } from 'src/app/services/auth.service';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { ProductividadService } from 'src/app/services/productividad.service';
import Swal from 'sweetalert2';
import { EditarProductividadComponent } from '../editar-productividad/editar-productividad.component';
import { GET_LIST_PRODUCTIVIDADES } from './store/actions/gestion-productividad.actions';
import { appProductividadesState } from './store/appProductividaes.reducer';
import { PaginationModel } from 'src/app/model/paginationModel';
import { PageEvent } from '@angular/material/paginator';
import { ExportService } from 'src/app/services/export.service';
import { Subscription } from 'rxjs';
import { ANIOS } from '../../catalogs/catalogos'
import { NuevaProductividadComponent } from './nueva-productividad/nueva-productividad.component';



@Component({
  selector: 'app-productividad',
  templateUrl: './gestion-productividad.component.html',
  styleUrls: ['./gestion-productividad.component.css'],
  providers: [MessageService]
})
export class GestionProductividadComponent implements OnInit {

  public productividadForm: FormGroup;
  private listaProductividades$ = this.store.select('listProductividades');

  private listaProdSubscription: Subscription;

  catalogoClaveEmpleados: clavesEmpleado[];
  fecha = new Date().getFullYear();
  // claveEmpleado: number;
  anios: any = ANIOS;
  servicios: Productividad[];


  public step: number = 0;
  public length: number = 100;
  public pageSize: number = 5;
  public pagination: PaginationModel;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public pageEvent: PageEvent;


  constructor(private authService: AuthService,
    private productividadServ: ProductividadService,
    private router: Router,
    private catalogoService: CatalogosService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private store: Store<appProductividadesState>,
    private exportDataExcel: ExportService,
  ) { }


  ngOnInit(): void {
    if (!this.authService.isAuthtenticated()) {
      this.router.navigate(['/login']);
    }

    this.pagination = {
      size: 5,
      page: 0
    }

    this.initForm();

    this.listaProdSubscription = this.listaProductividades$.subscribe(resp => {
      this.servicios = resp.dataGet.content;
      this.length = resp.dataGet.totalElements;

    })

    this.catalogoCalveEmpleados();
    this.productividadForm.controls['anio'].setValue(this.fecha);
    this.store.dispatch(GET_LIST_PRODUCTIVIDADES({ pagination: this.pagination }));

  }

  private initForm() {
    this.productividadForm = this.formBuilder.group({
      empleado: [null, Validators.required],
      anio: [null, Validators.required],
    })
  }

  catalogoCalveEmpleados() {
    this.catalogoService.obtenerServicios().subscribe(list => {
      this.catalogoClaveEmpleados = list;
    });
  }

  openDialogEditarRegistro(servicioId: number) {
    console.log('abriendo modal actualizar registro de productividad');
    const dialogRefEdit = this.dialog.open(EditarProductividadComponent, {
      data: { id: servicioId }
    });

    dialogRefEdit.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogAltaRegistro() {
    console.log('abriendo modal nuevo registro de productividad');
    const dialogRefAlta = this.dialog.open(NuevaProductividadComponent, {
      data: {}
    });

    dialogRefAlta.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.store.dispatch(GET_LIST_PRODUCTIVIDADES({ pagination: this.pagination }));
    });
  }


  eliminarRegistro(servicioId: number) {
    console.log("ServicioId: ", servicioId);
    Swal.fire({
      title: '¿Esta seguro de dar de baja el registro?',
      text: "Se dara de baja el registro con id " + servicioId,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f16d00',
      cancelButtonColor: '#0000002a',
      confirmButtonText: 'SI',
      cancelButtonText: 'NO'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productividadServ.eliminarRegistro(servicioId).subscribe(resp => {
          console.log(resp);
        });
      }
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  getPaginatorData(event: any) {
    this.pagination = {
      page: event.pageIndex,
      size: event.pageSize,
    }
    this.store.dispatch(GET_LIST_PRODUCTIVIDADES({ pagination: this.pagination }));

    return event;

  }

  public export() {
    console.log('Exportar datos a Excel: ', this.servicios);
    this.exportDataExcel.exportAsExcelFile(this.servicios, 'Lista_servicios');
  }

  buscar() {
    console.log('Buscar registros');
  }

}
