import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/model/usuario';
import { altaUsuario } from '../nuevo-usuario/store/actions/usuarios.actions';
import { AppUsuarioState } from './store/appUsuario.reducers';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css'],
  providers: [MessageService]
})
export class NuevoUsuarioComponent implements OnInit {

  public usuarioForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store<AppUsuarioState>, private messageService: MessageService) { }


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
      this.messageService.add({severity:'error', summary:'Error', detail:'Las contraseñas no coinciden'});
      return;
    }
    const usuario: Usuario =  this.usuarioForm.value;

    this.store.dispatch(altaUsuario({usuario: usuario}));
    
    this.store.select('usuario').subscribe((data: any) => {
      console.log('Respuesta servicio: ', data);
      if(data.user.status===200) {
        this.messageService.clear();
        this.messageService.add({severity:'success', summary:'Error', detail: data.user.message!});
        this.resetFrom();
      } else {
        this.messageService.clear();
        this.messageService.add({severity:'error', summary:'Error', detail: data.user.error!.message});
      }
    })
  }

  private resetFrom() {
    this.usuarioForm.reset();
  }

}
