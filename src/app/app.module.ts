import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {CommonModule} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NuevoUsuarioComponent } from './pages/nuevo-usuario/nuevo-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** Componentes de PrimeNG */
import {AccordionModule} from 'primeng/accordion';
import {ToastModule} from 'primeng/toast';
import {MatDialogModule} from '@angular/material/dialog';

/** Componentes de Material */
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  // {path: 'pages/trabajadores', component: TrabajadoresComponent},
  // {path: 'pages/bonos', component: BonosComponent},
     {path: 'login', component: LoginComponent},
  // {path: 'pages/compradores', component: CompradoresComponent},
  // {path: 'pages/productividad', component: ProductividadComponent},
  // {path: 'pages/inicio', component: InicioComponent},
  // {path: 'pages/usuarios', component: UsuariosComponent}
  //{path: 'routes', redirectTo: '/pages', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NuevoUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(routes),
    AccordionModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule, 
    ReactiveFormsModule,
    MatIconModule,
    ToastModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
