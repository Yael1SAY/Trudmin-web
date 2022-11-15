import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ANIOS, BONOS_GENERICO, MESES, PORCENTAJES_OC_SP } from 'src/app/catalogs/catalogos';
import { clavesEmpleado } from 'src/app/model/ClavesEmpleado';
import { Productividad } from 'src/app/model/productividad';
import { AuthService } from 'src/app/services/auth.service';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { ALTA_PRODUCTIVIDAD } from '../store/actions/gestion-productividad.actions';
import { appProductividadesState } from '../store/appProductividaes.reducer';

@Component({
  selector: 'app-nueva-productividad',
  templateUrl: './nueva-productividad.component.html',
  styleUrls: ['./nueva-productividad.component.css'],
  providers: [MessageService]
})
export class NuevaProductividadComponent implements OnInit {

  public productividadForm: FormGroup;
  catalogoClaveEmpleados: clavesEmpleado[];
  fecha = new Date().getFullYear();
  claveEmpleado: number;
  periodos: any;
  meses: any = MESES;
  anios: any = ANIOS;
  porcentajes: any = PORCENTAJES_OC_SP;
  bonos: any = BONOS_GENERICO;
  mes: any;

  private altaProductividad$ = this.store.select('altaProductividades');

  private altaProdSubscription: Subscription;

  constructor(    
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private catalogoService: CatalogosService,
    private store: Store<appProductividadesState>,) { }

  ngOnInit(): void {
    if (!this.authService.isAuthtenticated()) {
      this.router.navigate(['/login']);
    }
    this.initForm();
    this.catalogoCalveEmpleados();
    this.productividadForm.controls['anio'].setValue(this.fecha);
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
      if (data.dataProductividad.status === 200) {
        this.messageService.add({ severity: 'success', summary: 'OK', detail: data.dataProductividad.message });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: data.dataProductividad.error });
      }
      this.altaProdSubscription.unsubscribe();
    })
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
