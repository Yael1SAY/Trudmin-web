import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Trabajadores } from 'src/app/model/trabajadores';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TrabajadoresService } from 'src/app/services/trabajadores.service';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';
import { MisBonosComponent } from '../mis-bonos/mis-bonos.component';
import { OBTENER_PRODUCTIVIDAD } from '../productividad/store/actions/productividad.actions';
import { AppProductividadState } from '../productividad/store/appProductividad.reducers';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public usuario: Usuario;
  private trabajador: Trabajadores;
  public basicData: any;
  public basicOptions: any;
  private productividad$ = this.store.select('productividad');
  private dataMeses: string[] = [];
  private dataOC: number[] = [];
  private dataSP: number[] = [];
  public showGrafic: boolean = false

  idImagen = "../../../assets/Images/spider-man.jpg";

  constructor(public authService: AuthService, 
    private trabajadoresService: TrabajadoresService,
    public dialog: MatDialog,
    private store: Store<AppProductividadState>,
    private datepipe: DatePipe,
    ) { }

  ngOnInit(): void {
    this.usuario = this.authService.comprador;

    this.trabajadoresService.obtenerTrabajadorPorUsuarioId(this.usuario.id).subscribe(resp => {
      this.trabajador = resp.data;
      console.log('EmpleadoId: ', this.trabajador.empleadoId)
      let filtros: any = {
        empleadoId: this.trabajador.empleadoId,
        anio: new Date().getFullYear(),
      };
  
      this.store.dispatch(OBTENER_PRODUCTIVIDAD({ filtros: filtros }))
    });

    this.productividad$.subscribe(data => {
      console.log('================data: ', data)
      this.limpiarGrafica();
      let datos: any = { ...data }
      let dataGrafica: any[] = datos.productividad.dataProductividad.data;
      if(dataGrafica !== undefined && dataGrafica.length > 0) {
        this.showGrafic = true;
      } else {
        this.showGrafic = false;
      }
      for (let item of dataGrafica) {
        this.dataMeses.push(item.mes);
        this.dataOC.push(item.totalOC);
        this.dataSP.push(item.totalSolPed);
      }

      this.mostrarGrafica(this.dataSP, this.dataOC);
    });  
    
  }

  mostrarGrafica(dataGraficaSp: number[], dataGraficaOC: number[]){
    this.basicData = {
      labels: this.dataMeses,
      datasets: [
        {
          label: 'Solicitud de pedido',
          backgroundColor: '#42A5F5',
          data: dataGraficaSp
        },
        {
          label: 'Orden de compra',
          backgroundColor: '#FFA726',
          data: dataGraficaOC
        }
      ]
    };
  }

  limpiarGrafica() {
    this.dataMeses = [];
    this.dataOC = [];
    this.dataSP = [];
  }

  applyLightTheme() {
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };
  }

  cambiarImagen() {
    console.log("Cambiando imagen de perfil")
  }

  openDialogactualizarPerfil() {
    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogMisBonos() {
    const dialogRef = this.dialog.open(MisBonosComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
