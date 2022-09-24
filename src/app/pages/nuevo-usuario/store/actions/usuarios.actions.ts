import { createAction, props } from "@ngrx/store";
import { Usuario } from "../../../../model/usuario"

export const altaUsuario = createAction('[Usuario] Alta Usuario',
    props<{ usuarioNew: Usuario }>()
);

export const altaUsuarioSuccess = createAction(
    '[Usuario] Alta usuario success',
    props<{ usuarioNew: Usuario }>()
);

export const altaUsuarioError = createAction(
    '[Usuario] Alta usuario error',
    props<{ payload: any }>()
);