import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { clavesEmpleado } from 'src/app/model/ClavesEmpleado';
import { AuthService } from 'src/app/services/auth.service';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { ProductividadService } from 'src/app/services/productividad.service';

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
  templateUrl: './productividad.component.html',
  styleUrls: ['./productividad.component.css']
})
export class ProductividadComponent implements OnInit {

  usuario: any;
  basicData: any;
  basicOptions: any;
  totalData: any;
  claveEmpleado: number;
  fecha = new Date().getFullYear();
  catalogoClaveEmpleados: clavesEmpleado[];
  anios: any = ANIOS;
  meses: any = MESES;
  mes:any;

  public datos: any = {
    empleadoId: "",
    anio: ""
  }

  constructor(private authService: AuthService, private productividadServ: ProductividadService,
    private router: Router, private catalogoService: CatalogosService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.datos.anio = this.fecha;
    this.mes = new Date().getMonth();
    console.log("Mes actual: ", this.mes);
    this.catalogoCalveEmpleados();

    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Solicitudes de pedido',
          backgroundColor: '#42A5F5',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'Orden de compras',
          backgroundColor: '#FFA726',
          data: [28, 48, 40, 19, 86, 27, 90]
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
      console.log("Catalogo de claves de empleados: ", list);
      this.catalogoClaveEmpleados = list;
      console.log("Catalogo de claves de empleados mapeado: ", this.catalogoClaveEmpleados);
    });
  }

}
