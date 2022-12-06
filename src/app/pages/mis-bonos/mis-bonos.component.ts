import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ANIOS } from 'src/app/catalogs/catalogos';
import { Bono } from 'src/app/model/bono';
import { AuthService } from 'src/app/services/auth.service';
import { OBTENER_MIS_BONOS } from './store/actions/mis-bonos.actions';
import { AppMisBonosState } from './store/appMisBonos.reducer';

@Component({
  selector: 'app-mis-bonos',
  templateUrl: './mis-bonos.component.html',
  styleUrls: ['./mis-bonos.component.css']
})
export class MisBonosComponent implements OnInit {

  public anios: any = ANIOS;
  public fecha = new Date().getFullYear();
  public filterForm: FormGroup;
  public bonos: Bono[];
  private misBonos$ = this.store.select('misBonos');
  public totalData: any;
  public basicOptions: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<AppMisBonosState>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {

    if (!this.authService.isAuthtenticated()) {
      this.router.navigate(['/login']);
    }

    console.log("datos del modal: ", this.data.empleadoId);

    this.initForm();
    this.filterForm.controls['anio'].setValue(this.fecha);

    this.misBonos$.subscribe(data => {
      console.log("datos de mis bonos: ", data);
      if (data.dataMisBonos.status === 200){
        this.bonos = data.dataMisBonos.data;
        this.mostrarGrafica(this.bonos);
      } else {
        this.bonos = [];
        this.mostrarGrafica(this.bonos);
      }
      
    })

    this.store.dispatch(OBTENER_MIS_BONOS({empleadoId: this.data.empleadoId, anio: this.filterForm.controls['anio'].value}))

  }

  private initForm() {
    this.filterForm = this.formBuilder.group({
      anio: [null, Validators.required],
    })
  }

  buscar() {
    this.store.dispatch(OBTENER_MIS_BONOS({empleadoId: this.data.empleadoId, anio: this.filterForm.controls['anio'].value}))
  }

  mostrarGrafica(data: Bono[]) {
    let meses: string[] = [];
    let bonos: number[] = [];
    console.log("data para grafica: ", data.forEach(item => {
      meses.push(item.mes);
      bonos.push(item.total);
    }))
    this.totalData = {
      labels: meses,
      datasets: [
        {
          label: 'Bonos',
          backgroundColor: '#42A5F5',
          data: bonos
        },
        // {
        //   label: 'Orden de compras',
        //   backgroundColor: '#FFA726',
        //   data: [arrayOC]
        // }
      ],
    };
  }

}
