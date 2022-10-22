import { Component, OnDestroy, OnInit } from '@angular/core';
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
import {
  ALTA_PRODUCTIVIDAD,
  ALTA_PRODUCTIVIDAD_OK,
  GET_LIST_PRODUCTIVIDADES
} from './store/actions/gestion-productividad.actions';
import { appProductividadState } from './store/appProductividaes.reducer';
import { PaginationModel } from 'src/app/model/paginationModel';
import { PageEvent } from '@angular/material/paginator';
import { ExportService } from 'src/app/services/export.service';
import { Subscription } from 'rxjs';
import { ANIOS, BONOS_GENERICO, MESES, PORCENTAJES_OC_SP } from '../../catalogs/catalogos'



@Component({
  selector: 'app-productividad',
  templateUrl: './gestion-productividad.component.html',
  styleUrls: ['./gestion-productividad.component.css'],
  providers: [MessageService]
})
export class GestionProductividadComponent implements OnInit {

  public productividadForm: FormGroup;
  private listaProductividades$ = this.store.select('listProductividades');
  private altaProductividad$ = this.store.select('altaProductividades');

  private listaProdSubscription: Subscription;
  private altaProdSubscription: Subscription;

  catalogoClaveEmpleados: clavesEmpleado[];
  fecha = new Date().getFullYear();
  claveEmpleado: number;
  periodos: any;
  meses: any = MESES;
  anios: any = ANIOS;
  porcentajes: any = PORCENTAJES_OC_SP;
  bonos: any = BONOS_GENERICO;
  mes: any;
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
    private store: Store<appProductividadState>,
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
      mes: [null, Validators.required],
      anio: [null, Validators.required],
      periodo: [null, Validators.required],
      totalSolPed: [null, Validators.required],
      totalOC: [null, Validators.required],
      diasOc: [null],
      diasSP: [null],
      criterio: [null, Validators.required],
      discrecional: [null, Validators.required],
      ahorro: [null, Validators.required],
      capturaTiempo: [null, Validators.required],
      total: [null]
    })


  }

  llamarMetodoBuscarServicios() {
    // this.page = 0;
    // this.pageSize = 40;
    //this.BuscarServicios()
  }

  actualizaComprador(valor) {
    // if (valor != undefined) {
    //   this.productividadForm.controls['empleadoId'].setValue(valor);
    //   this.productividadServ.obtenerServicios(valor, this.fecha).subscribe(servicios => {
    //     this.servicios = servicios;
    //   });
    // } else {
    //   this.servicios = [];
    // }
  }

  actualizarAnio(valor: any) {
    // console.log("descripcion anio: ", valor);
    // if (valor != undefined) {
    //   this.fecha = valor;
    //   if (this.claveEmpleado != undefined) {
    //     this.productividadServ.obtenerServicios(this.claveEmpleado, this.fecha).subscribe(servicios => {
    //       this.servicios = servicios;
    //     });
    //   }
    // } else {
    //   this.fecha = new Date().getFullYear();
    //   this.actualizaComprador(this.claveEmpleado);
    // }

  }


  catalogoCalveEmpleados() {
    this.catalogoService.obtenerServicios().subscribe(list => {
      this.catalogoClaveEmpleados = list;
    });
  }

  guardarRegistro() {
    let productividad: Productividad = { ...this.productividadForm.value };

    productividad.periodo = this.productividadForm.controls['mes'].value.id + '-' +
      this.productividadForm.controls['anio'].value;
    productividad.mes = this.productividadForm.controls['mes'].value.descripcion;
    productividad.empleadoId = this.productividadForm.controls['empleado'].value.empleadoId

    this.store.dispatch(ALTA_PRODUCTIVIDAD({ productividad: productividad }));

    this.altaProdSubscription = this.altaProductividad$.subscribe(data => {
      console.log("Data: ", data);
      if (data.dataProductividad.status === 200) {
        this.messageService.add({ severity: 'success', summary: 'OK', detail: data.dataProductividad.message! });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: data.error!.message });
      }
      this.altaProdSubscription.unsubscribe();
    })
  }

  // ngOnDestroy(): void {
  //   this.altaProdSubscription.unsubscribe();
  //   this.listaProdSubscription.unsubscribe();
  // }

  openDialogEditarRegistro(servicioId: number) {
    console.log('abriendo modal actualizar registro de productividad');
    const dialogRef = this.dialog.open(EditarProductividadComponent, {
      data: { id: servicioId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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

  // nextStep() {
  //   this.step++;
  // }
  // prevStep() {
  //   this.step--;
  // }

  getPaginatorData(event) {
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

  public selectSP(event) {
    this.productividadForm.controls['diasSP'].setValue(this.bonosPorProductividad(event));
    this.sumaTotal();
  }

  public selectOC(event) {
    this.productividadForm.controls['diasOc'].setValue(this.bonosPorProductividad(event))
    this.sumaTotal();
  }

  private bonosPorProductividad(porcentaje: number): number {
    let total: number = 0;
    switch (true) {
      case (porcentaje < 60):
        total = 0;
        break
      case (porcentaje < 70):
        total = 1
        break
      case (porcentaje < 80):
        total = 2
        break
      case (porcentaje < 90):
        total = 3
        break
      case (porcentaje <= 100):
        total = 4
        break
    }
    return total
  }

  public sumaTotal(): void {
    let total: number = 0;
    let diasOc = this.productividadForm.controls['diasOc'].value == null ? 0 : this.productividadForm.controls['diasOc'].value; 
    let diasSP = this.productividadForm.controls['diasSP'].value == null ? 0 : this.productividadForm.controls['diasSP'].value;
    let criterio = this.productividadForm.controls['criterio'].value == null ? 0 : this.productividadForm.controls['criterio'].value;
    let discrecional = this.productividadForm.controls['discrecional'].value == null ? 0 : this.productividadForm.controls['discrecional'].value;
    let ahorro = this.productividadForm.controls['ahorro'].value == null ? 0 : this.productividadForm.controls['ahorro'].value;
    let capturaTiempo = this.productividadForm.controls['capturaTiempo'].value == null ? 0 : this.productividadForm.controls['capturaTiempo'].value;
    total = diasOc + diasSP + criterio + discrecional + ahorro + capturaTiempo;
    this.productividadForm.controls['total'].setValue(total);
  }

}
