import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductividadesEffects } from './store/effects/productividades.effects';
import { productividadReducer } from './store/reducers/gestion-productividad.reducers';
import { APP_PRODUCTIVIDADES_REDUCER } from './store/appProductividaes.reducer';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('listProductividades', APP_PRODUCTIVIDADES_REDUCER.listProductividades),
    StoreModule.forFeature('altaProductividades', APP_PRODUCTIVIDADES_REDUCER.altaProductividades),

    EffectsModule.forFeature([ProductividadesEffects]),
  ]
})
export class ProductividadModule { }