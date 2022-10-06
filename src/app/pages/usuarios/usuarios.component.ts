import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PaginationModel } from 'src/app/model/paginationModel';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { obtenerUsuarios } from './store/acctions/usuarios.actions';
import { AppUsuariosState } from './store/appUsuarios.reducers';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  
  public step:            number            = 0;
  public usuarios:        Usuario[]         = [];
  public length:          number            = 100;
  public pageSize:        number            = 5;
  public pagination:      PaginationModel;
  public pageSizeOptions: number[]          = [5, 10, 25, 100];
  public pageEvent:       PageEvent;
  public filtrosForm: FormGroup;
  

  constructor(private authService: AuthService, 
    private store: Store<AppUsuariosState>,
    private router: Router,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.pagination = {
      size: 5,
      page: 0
    }

    this.filtrosForm = this.formBuilder.group({
      nombreUsuario: [null],
      usuario: [null]
    })
    
    this.store.dispatch(obtenerUsuarios({pagination: this.pagination}));

    if (!this.authService.isAuthtenticated()) {
      this.router.navigate(['/login']);
    }
    this.store.select('usuarios').subscribe(data => {
      
      this.usuarios = data.payload.content;
      this.length = data.payload.totalElements;
    })

  }

  getPaginatorData(event){
    this.pagination = {
      page: event.pageIndex,
      size: event.pageSize,
    }
    this.store.dispatch(obtenerUsuarios({pagination: this.pagination}));

    return event;
    
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

  

  BuscarUusario() {
    const filtrosBusqueda = this.filtrosForm.value;
    console.log(filtrosBusqueda); 
  }

  mostrarBonos(){
    console.log("Mostrar")
  }

}
