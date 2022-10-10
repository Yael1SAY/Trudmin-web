import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TrabajadoresEffects } from './store/effects/trabajadores.effects';
import { trabajadoresReducer } from './store/reducers/trabajadores.reducers';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('listTrabajadores', trabajadoresReducer),
    EffectsModule.forFeature([TrabajadoresEffects]),
  ]
})
export class TrabajadoresModule { }
