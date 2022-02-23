import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  public datos: any = {
    nombreUsuario: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    password: '',
    confirmPassword: '',
    subareaId:"",
    puestoId:"",
    telefono: ""
  };

  constructor() { }

  ngOnInit(): void {
  }

  GuardarUsuario(){
    console.log("Se guarda Usuario")
  }

}
