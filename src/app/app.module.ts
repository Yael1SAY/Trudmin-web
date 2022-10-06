import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NuevoUsuarioComponent } from './pages/nuevo-usuario/nuevo-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from './services/usuario.service';
import { AuthService } from './services/auth.service';

/** Componentes de PrimeNG */
import { AccordionModule } from 'primeng/accordion';
import { ToastModule } from 'primeng/toast';
import { MatDialogModule } from '@angular/material/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { ChartModule } from 'primeng/chart';


/** Componentes de Material */
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { InicioComponent } from './pages/inicio/inicio.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { TrabajadoresComponent } from './pages/trabajadores/trabajadores.component';
import { GestionProductividadComponent } from './pages/gestion-productividad/gestion-productividad.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';

import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';
import { MisBonosComponent } from './pages/mis-bonos/mis-bonos.component';
import { EditarProductividadComponent } from './pages/editar-productividad/editar-productividad.component';
import { ProductividadComponent } from './pages/productividad/productividad.component';
import { ProductividadService } from './services/productividad.service';
import { AccesoRutasGuard } from './guards/acceso-rutas.guard';

/**
 * NGRX
 */
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { _usuariosReducer } from './pages/usuarios/store/reducers/usuarios.reducers';
import { NuevoUsuarioModule } from './pages/nuevo-usuario/nuevo-usuario.module';
import { UsuariosModule } from './pages/usuarios/usuarios.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductividadModule } from './pages/gestion-productividad/productividades.module';
//import { AuthInterceptorService } from './auth-interceptor.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  //{path: 'pages/trabajadores', component: TrabajadoresComponent},
  // {path: 'pages/bonos', component: BonosComponent},
  { path: 'login', component: LoginComponent },
  //{path: 'pages/compradores', component: CompradoresComponent},
  { path: 'pages/gestion-productividad', component: GestionProductividadComponent, canActivate: [AccesoRutasGuard] },
  { path: 'pages/productividad', component: ProductividadComponent },
  { path: 'pages/inicio', component: InicioComponent },
  { path: 'pages/usuarios', component: UsuariosComponent, canActivate: [AccesoRutasGuard] },
  { path: 'pages/trabajadores', component: TrabajadoresComponent, canActivate: [AccesoRutasGuard] },
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NuevoUsuarioComponent,
    InicioComponent,
    UsuariosComponent,
    TrabajadoresComponent,
    GestionProductividadComponent,
    HeaderComponent,
    FooterComponent,
    EditarUsuarioComponent,
    MisBonosComponent,
    EditarProductividadComponent,
    ProductividadComponent
  ],
  imports: [
    BrowserModule,
    NuevoUsuarioModule,
    UsuariosModule,
    ProductividadModule,
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
    SidebarModule,
    MenubarModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    RippleModule,
    MatMenuModule,
    ChartModule,
    MatExpansionModule,
    MatButtonModule,
    MatSelectModule,
    MatTabsModule,
    MatPaginatorModule,
    //StoreModule.forRoot({ usuario: _usuarioReducer, usuarios: _usuariosReducer }),
    //StoreModule.forRoot(appReducers),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    
  ],
  providers: [UsuarioService, AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProductividadService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthService,
      multi: true
    }],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
