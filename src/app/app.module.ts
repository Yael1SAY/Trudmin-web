import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  // {path: 'pages/trabajadores', component: TrabajadoresComponent},
  // {path: 'pages/bonos', component: BonosComponent},
  // {path: 'login', component: LoginComponent},
  // {path: 'pages/compradores', component: CompradoresComponent},
  // {path: 'pages/productividad', component: ProductividadComponent},
  // {path: 'pages/inicio', component: InicioComponent},
  // {path: 'pages/usuarios', component: UsuariosComponent}
  //{path: 'routes', redirectTo: '/pages', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
