import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TrabajadoresEffects } from './store/effects/trabajadores.effects';
import { trabajadoresReducer } from './store/reducers/trabajadores.reducers';
import { AltaTrabajadorComponent } from './alta-trabajador/alta-trabajador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** PrimeNG */
import { ToastModule } from 'primeng/toast';

/**Material angular */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    AltaTrabajadorComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('listTrabajadores', trabajadoresReducer),
    EffectsModule.forFeature([TrabajadoresEffects]),
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    MatPaginatorModule,
    MatDatepickerModule,  
    MatNativeDateModule,
  ],
  providers: [  
    MatDatepickerModule,  
    MatNativeDateModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class TrabajadoresModule { }
