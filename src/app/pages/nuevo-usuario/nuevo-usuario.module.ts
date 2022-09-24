import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { appUsuarioReducers } from './store/appUsuario.reducers';
import { EffectsModule } from '@ngrx/effects';
import { UsuarioEffects } from './store/effects/usuario.effects';
import { usuarioReducers } from './store/reducers/usuario.reducer';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forRoot([UsuarioEffects]),
    StoreModule.forRoot(appUsuarioReducers),
  ]
})
export class NuevoUsuarioModule { }
