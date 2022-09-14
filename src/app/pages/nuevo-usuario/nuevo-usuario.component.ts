import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/model/usuario';
import { altaUsuario } from './store/actions';

import swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {

  public usuarioForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store) { }

  

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      nombreUsuario: [null, Validators.required],
      nombre: [null, Validators.required],
      apellidoPaterno: [null, Validators.required],
      apellidoMaterno: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    })
  }

  RegustrarUsuario(){
    if (this.usuarioForm.controls['password'].value !== this.usuarioForm.controls['confirmPassword'].value){
      this.usuarioForm.controls['password'].setValue('');
      this.usuarioForm.controls['confirmPassword'].setValue('');
      return;
    }
    const usuario: Usuario =  this.usuarioForm.value;

    let store = this.store.dispatch(altaUsuario({usuario: usuario}));
    console.log('resp store: ', store);
    
  }

}
