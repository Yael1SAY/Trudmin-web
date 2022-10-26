import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ANIOS, MESES } from 'src/app/catalogs/catalogos';
import { clavesEmpleado } from 'src/app/model/ClavesEmpleado';
import { AuthService } from 'src/app/services/auth.service';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { ProductividadService } from 'src/app/services/productividad.service';
import { AppProductividadState } from './store/appProductividad.reducers'
import { OBTENER_PRODUCTIVIDAD } from './store/actions/productividad.actions';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-productividad',
  templateUrl: './productividad.component.html',
  styleUrls: ['./productividad.component.css']
})
export class ProductividadComponent implements OnInit {

  public productividadForm: FormGroup;
  basicData: any;
  basicOptions: any;
  totalData: any;
  // claveEmpleado: number;
  fecha = new Date().getFullYear();
  catalogoClaveEmpleados: clavesEmpleado[];
  anios: any = ANIOS;
  meses: any = MESES;
  mes: any;
  dataMeses: string[] = [];
  dataOC: number[] = [];
  dataSP: number[] = [];

  private productividad$ = this.store.select('productividad');

  // public datos: any = {
  //   empleadoId: "",
  //   anio: ""
  // }

  constructor(private authService: AuthService,
    private productividadServ: ProductividadService,
    private router: Router,
    private catalogoService: CatalogosService,
    public dialog: MatDialog,
    private store: Store<AppProductividadState>,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.initForm();

    this.productividad$.subscribe(data => {
      this.limpiarGrafica();
      let datos: any = { ...data }
      let dataGrafica = datos.productividad.dataProductividad.data
      console.log('data: ', dataGrafica);
      for (let item of dataGrafica) {
        this.dataMeses.push(item.mes)
        this.dataOC.push(item.totalOC)
        this.dataSP.push(item.totalSolPed)
      }
      
      this.mostrarGrafica(this.dataSP, this.dataOC);
    })

    this.productividadForm.controls['anio'].setValue(this.fecha);
    this.mes = new Date().getMonth();
    console.log("Mes actual: ", this.mes);
    this.catalogoCalveEmpleados();


  }

  private initForm() {
    this.productividadForm = this.formBuilder.group({
      empleadoId: [null],
      anio: [null],
    })


  }

  mostrarGrafica(dataGraficaSp: number[], dataGraficaOC: number[]) {
    this.basicData = {
      labels: this.dataMeses,
      datasets: [
        {
          label: 'Solicitudes de pedido',
          backgroundColor: '#42A5F5',
          data: dataGraficaSp
        },
        {
          label: 'Orden de compras',
          backgroundColor: '#FFA726',
          data: dataGraficaOC
        }
      ]
    };
    this.totalData = {
      labels: ['Documentos'],
      datasets: [
        {
          label: 'Solicitudes de pedido',
          backgroundColor: '#42A5F5',
          data: [65]
        },
        {
          label: 'Orden de compras',
          backgroundColor: '#FFA726',
          data: [90]
        }
      ]
    };
  }

  limpiarGrafica() {
    this.dataMeses = [];
    this.dataOC = [];
    this.dataSP = [];
  }

  actualizaComprador(valor) {
    if (valor != undefined) {
      //this.claveEmpleado = valor;
      //this.datos.empleadoId = valor;
      // this.productividadServ.obtenerServicios(valor, this.fecha).subscribe(servicios => {
      //   this.servicios = servicios;
      // });
    } else {
      // this.servicios = [];
    }
  }

  actualizarAnio(valor: any) {
    // if (valor != undefined) {
    //   this.fecha = valor;
    //   if (this.claveEmpleado != undefined) {
    //     // this.productividadServ.obtenerServicios(this.claveEmpleado, this.fecha).subscribe(servicios => {
    //     //   this.servicios = servicios;
    //     // });
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


  buscar() {
    let filtros: any = {
      empleadoId: this.productividadForm.controls['empleadoId'].value,
      anio: this.productividadForm.controls['anio'].value
    };

    this.store.dispatch(OBTENER_PRODUCTIVIDAD({ filtros: filtros }))
  }

}
