import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { AltaTrabajador } from 'src/app/model/altaTrabajador';
import { CatalogoPuestos } from 'src/app/model/catalogo-puestos';
import { CatalogoUsuarios } from 'src/app/model/catalogo-usuarios';
import { CatalogoSubareras } from 'src/app/model/catalogo_subareas';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { ALTA_TRABAJADOR } from '../store/acctions/trabajadores.actions';
import { appTrabajadoresState } from '../store/appTrabajadores.reducers';

const ESTATUS: any = [
  { estatus: true, descripcion: 'Activo' },
  { estatus: false, descripcion: 'Baja' }
];

@Component({
  selector: 'app-alta-trabajador',
  templateUrl: './alta-trabajador.component.html',
  styleUrls: ['./alta-trabajador.component.css'],
  providers: [MessageService]
})
export class AltaTrabajadorComponent implements OnInit {

  public trabajadorNewForm: FormGroup;
  public catalogPuestos: CatalogoPuestos[];
  public catalogSubareas: CatalogoSubareras[];
  public catalogUsuarios: CatalogoUsuarios[];
  public estatus: any[];
  private altaTarbajador$ = this.store.select('altaTrabajador');

  constructor(private messageService: MessageService,
    private formBuilder: FormBuilder,
    private catalogoService: CatalogosService,
    private store: Store<appTrabajadoresState>,
    public datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.obtenerCatalogoPuestos();
    this.obtenerCatalogoSubareas();
    this.obtenerCatalogoUsuarios();
    this.estatus = ESTATUS;
  }


  private initForm() {
    this.trabajadorNewForm = this.formBuilder.group({
      clave: [null, Validators.required],
      estatus: [null, Validators.required],
      fechaInicio: [null, Validators.required],
      fechaFin: [null],
      telefono: [null, Validators.required],
      puesto: [null, Validators.required],
      subarea: [null, Validators.required],
      usuario: [null, Validators.required]
    });
  }

  public AltaTrabajador() {
    let trabajadorNuevo: AltaTrabajador = {
      clave: this.trabajadorNewForm.controls['clave'].value,
      estatus: this.trabajadorNewForm.controls['estatus'].value,
      fechaFin: this.datepipe.transform(this.trabajadorNewForm.controls['fechaFin'].value, 'yyyy-MM-dd'),
      fechaInicio: this.datepipe.transform(this.trabajadorNewForm.controls['fechaInicio'].value, 'yyyy-MM-dd'),
      puesto: this.trabajadorNewForm.controls['puesto'].value,
      subArea: this.trabajadorNewForm.controls['subarea'].value,
      telefono: this.trabajadorNewForm.controls['telefono'].value,
      usuario: this.trabajadorNewForm.controls['usuario'].value,
    };
    
    console.log('Nuevo trabajador: ', trabajadorNuevo);

    this.store.dispatch(ALTA_TRABAJADOR({ nuevoTrabajador: trabajadorNuevo }));

    this.altaTarbajador$.subscribe(resp => {
      if(resp.dataHigh.status === 200){
        this.trabajadorNewForm.reset;
        this.messageService.add({severity:'success', summary:'OK', detail: resp.dataHigh.message!});
      }
    })
  }

  private obtenerCatalogoPuestos() {
    this.catalogoService.obtenerCatalogoPuestos().subscribe(data => {
      this.catalogPuestos = data;
    })
  }

  private obtenerCatalogoSubareas() {
    this.catalogoService.obtenerCatalogoSubareas().subscribe(data => {
      this.catalogSubareas = data;
    })
  }

  private obtenerCatalogoUsuarios() {
    this.catalogoService.obtenerCatalogoUsuarios().subscribe(data => {
      this.catalogUsuarios = data;
    })
  }

}
