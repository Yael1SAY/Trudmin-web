
export class Usuario{
    id: number = 0;
    nombreUsuario: string = "";
    password: string = "";
    nombre: string = "";
    apellidoPaterno: string = "";
    apellidoMaterno: string = "";
    email: string = "";
    fechaCreacion: Date | undefined;
    estatus: boolean | undefined;
    roles: String[] = [];
  }