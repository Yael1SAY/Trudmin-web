import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [MessageService]
})
export class HeaderComponent implements OnInit {

  usuario: any;

  visibleSidebar1: any;
  // visibleSidebar2: any;
  // visibleSidebar3: any;
  // visibleSidebar4: any;
  // visibleSidebar5: any;

  showFiller = false;

  constructor(public authService: AuthService, private router: Router,
    private messageService: MessageService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.usuario = this.authService.comprador;
    console.log("usuario Header: ", this.usuario);
  }

  showToast(){
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'}); 
  }

  logout():void{
  let nombre = this.authService.comprador.nombre;
  this.authService.logout();
  //this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'}); 
  swal.fire('Logout', 'Hola ' + nombre + ' has cerrado sesión con éxito', 'success');
  this.router.navigate(['/login']);
  }
}
