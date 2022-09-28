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
import {
  ALTA_PRODUCTIVIDADES,
  // altaProductividad, 
  GET_LIST_PRODUCTIVIDADES
} from './store/actions/gestion-productividad.actions';
import { appProductividadState } from './store/appProductividaes.reducer';

const ANIOS: any = [
  { id: 1, descripcion: 2015 },
  { id: 2, descripcion: 2016 },
  { id: 3, descripcion: 2017 },
  { id: 4, descripcion: 2018 },
  { id: 5, descripcion: 2019 },
  { id: 6, descripcion: 2020 },
  { id: 7, descripcion: 2021 },
  { id: 1, descripcion: 2022 },
  { id: 1, descripcion: 2023 },
  { id: 1, descripcion: 2024 },
  { id: 1, descripcion: 2025 }
];

const MESES: any = [
  { id: "01", descripcion: "Enero" },
  { id: "02", descripcion: "Febrero" },
  { id: "03", descripcion: "Marzo" },
  { id: "04", descripcion: "Abril" },
  { id: "05", descripcion: "Mayo" },
  { id: "06", descripcion: "Junio" },
  { id: "07", descripcion: "Julio" },
  { id: "08", descripcion: "Agosto" },
  { id: "09", descripcion: "Septiembre" },
  { id: "10", descripcion: "Octubre" },
  { id: "11", descripcion: "Noviembre" },
  { id: "12", descripcion: "Diciembre" }
];

@Component({
  selector: 'app-productividad',
  templateUrl: './gestion-productividad.component.html',
  styleUrls: ['./gestion-productividad.component.css'],
  providers: [MessageService]
})
export class GestionProductividadComponent implements OnInit {

  public productividadForm: FormGroup;

  catalogoClaveEmpleados: clavesEmpleado[];
  fecha = new Date().getFullYear();
  claveEmpleado: number;
  periodos: any;
  meses: any = MESES;
  anios: any = ANIOS;
  mes: any;
  servicios: Productividad[];;
  first = 0;
  rows = 10;
  step = 0;
  page = 0;
  totalPage: number | undefined;
  totalElements: number | undefined;
  pageSize: Number = 40;

  constructor(private authService: AuthService, private productividadServ: ProductividadService,
    private router: Router, private catalogoService: CatalogosService, public dialog: MatDialog,
    private formBuilder: FormBuilder, private messageService: MessageService,
    private store: Store<appProductividadState>
  ) { }

  ngOnInit(): void {
    if (!this.authService.isAuthtenticated()) {
      this.router.navigate(['/login']);
    }

    this.productividadForm = this.formBuilder.group({
      empleadoId: [null, Validators.required],
      mes: [null, Validators.required],
      anio: [null, Validators.required],
      periodo: [null, Validators.required],
      totalSolPed: [null, Validators.required],
      totalOC: [null, Validators.required],
      diasOc: [null, Validators.required],
      diasSP: [null, Validators.required],
      criterio: [null, Validators.required],
      discrecional: [null, Validators.required],
      ahorro: [null, Validators.required],
      capturaTiempo: [null, Validators.required],
      total: [null, Validators.required]
    })

    //this.BuscarServicios()
    this.catalogoCalveEmpleados();
    this.productividadForm.controls['anio'].setValue(this.fecha);
    this.store.dispatch(GET_LIST_PRODUCTIVIDADES())

    this.store.select('listProductividades').subscribe(resp => {
      console.log('resp: ', resp.dataGet);
      this.servicios = resp.dataGet.data;
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

  buscarPorPagina(event: any) {
    this.page = event.page;
    this.pageSize = event.rows;
    //this.BuscarServicios();
    //console.log("Pagina: ", event);
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

    this.store.dispatch(ALTA_PRODUCTIVIDADES({ altaProductividades: productividad }));

    this.store.select('altaProductividades').subscribe(data => {
      if(data.dataHigh.status===200) {
        this.messageService.clear();
        this.messageService.add({severity:'success', summary:'OK', detail: data.dataHigh.message!});
        this.productividadForm.reset();
        console.log('Lista de productividades final: ', this.servicios);
      } else {
        this.messageService.clear();
        this.messageService.add({severity:'error', summary:'Error', detail: data.error!.message});
      }
    });
  }

  // limpiarDatosAlata() {
  //   this.datos.mes = "",
  //     this.datos.periodo = "",
  //     this.datos.totalSolPed = "",
  //     this.datos.totalOC = "",
  //     this.datos.diasOc = "",
  //     this.datos.diasSP = "",
  //     this.datos.criterio = "",
  //     this.datos.discrecional = "",
  //     this.datos.ahorro = "",
  //     this.datos.capturaTiempo = "",
  //     this.datos.total = ""
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
