import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { misBonosReducer } from './store/reducers/mis-bonos.reducers';
import { MisBonosEffects } from './store/effects/mis-bonos.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatExpansionModule,
    StoreModule.forFeature('misBonos', misBonosReducer),
    EffectsModule.forFeature([MisBonosEffects]),
  ]
})
export class MisBonosModule { }
