import { createAction, props } from "@ngrx/store";
import { Usuario } from "../../../../model/usuario"

export const obtenerUsuarios = createAction(
    '[Usuarios] Obtener Usuario'
);

export const obtenerUsuariosSuccess = createAction(
    '[Usuarios] Obtener usuario success',
    props<{ usuarios: Usuario[] }>()
);

export const obtenerUsuariosError = createAction(
    '[Usuarios] Obtener usuarios error',
    props<{ payload: any }>()
);