import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UsuariosEffects } from './store/effects/usuarios.effects';
import { usuariosReducer } from './store/reducers/usuarios.reducers';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('usuarios', usuariosReducer),
    EffectsModule.forFeature([UsuariosEffects]),
  ]
})
export class UsuariosModule { }
