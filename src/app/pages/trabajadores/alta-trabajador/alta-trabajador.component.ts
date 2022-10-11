import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CatalogoPuestos } from 'src/app/model/catalogo-puestos';
import { CatalogoUsuarios } from 'src/app/model/catalogo-usuarios';
import { CatalogoSubareras } from 'src/app/model/catalogo_subareas';
import { CatalogosService } from 'src/app/services/catalogos.service';

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
  public catalogUsuarios: CatalogoUsuarios[]

  constructor(private messageService: MessageService, 
    private formBuilder: FormBuilder,
    private catalogoService: CatalogosService,
    ) { }

  ngOnInit(): void {
    this.initForm();
    this.obtenerCatalogoPuestos();
    this.obtenerCatalogoSubareas();
    this.obtenerCatalogoUsuarios();
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

  public AltaTrabajador(){
    console.log(this.trabajadorNewForm.value)
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
