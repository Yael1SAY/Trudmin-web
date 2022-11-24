import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductividadesEffects } from './store/effects/productividades.effects';
import { APP_PRODUCTIVIDADES_REDUCER } from './store/appProductividaes.reducer';
import { NuevaProductividadComponent } from './nueva-productividad/nueva-productividad.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {ToastModule} from 'primeng/toast';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    NuevaProductividadComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    ToastModule,
    MatDialogModule,
    StoreModule.forFeature('listProductividades', APP_PRODUCTIVIDADES_REDUCER.listProductividades),
    StoreModule.forFeature('altaProductividades', APP_PRODUCTIVIDADES_REDUCER.altaProductividades),

    EffectsModule.forFeature([ProductividadesEffects]),
  ]
})
export class ProductividadesModule { }