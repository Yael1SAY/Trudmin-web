import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { appUsuariosReducers } from './store/appUsuarios.reducers';
import { EffectsModule } from '@ngrx/effects';
import { UsuariosEffects } from './store/effects/usuarios.effects';
//import { usuariosReducer } from './store/reducers/usuarios.reducers'



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(appUsuariosReducers),
    EffectsModule.forRoot([UsuariosEffects]),
  ]
})
export class UsuariosModule { }
