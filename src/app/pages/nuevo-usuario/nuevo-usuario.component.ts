import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/model/usuario';
import { ALTA_USUARIO } from '../nuevo-usuario/store/actions/usuarios.actions';
import { AppUsuarioState } from './store/appUsuario.reducers';

import { MessageService } from 'primeng/api';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css'],
  providers: [MessageService]
})
export class NuevoUsuarioComponent implements OnInit {

  public usuarioForm: FormGroup;
  private usuarioResponse$: any = this.store.select('usuario');
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private formBuilder: FormBuilder,
    private store: Store<AppUsuarioState>,
    private messageService: MessageService,
    private _snackBar: MatSnackBar,
  ) { }


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

    this.getStatusAlta();
  }

  RegustrarUsuario() {
    if (this.usuarioForm.controls['password'].value !== this.usuarioForm.controls['confirmPassword'].value) {
      this.usuarioForm.controls['password'].setValue('');
      this.usuarioForm.controls['confirmPassword'].setValue('');
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Las contraseñas no coinciden' });
      return;
    }
    const usuario: Usuario = this.usuarioForm.value;

    this.store.dispatch(ALTA_USUARIO({ usuario: usuario }));
  }

  private resetFrom(): void {
    this.usuarioForm.reset();
  }

  private getStatusAlta(): void {
    this.usuarioResponse$.subscribe(data => {
      this.messageService.clear();
      if (data.dataUsuario.status === 200) {
        this._snackBar.open(data.dataUsuario.message, 'Cerrar', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
        });
        // this.messageService.add({ severity: 'success', summary: 'OK', detail: data.dataUsuario.message });
        //this.resetFrom();
      } else {
        const errores: string[] = data.dataUsuario.errors
        if (errores) {
          let errorConcat = '';
          for (let error of errores) {
            errorConcat += error + ' ';
            // this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          }
          this._snackBar.open(errorConcat, 'Cerrar', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000
          });
        } else {
          this._snackBar.open(data.dataUsuario.message, 'Cerrar', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000
          });
          // this.messageService.add({ severity: 'error', summary: 'Error', detail: data.dataUsuario.message });
        }

      }
    })
  }

}
