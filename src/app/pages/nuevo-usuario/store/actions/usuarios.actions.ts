import { createAction, props } from "@ngrx/store";
import { GenericResponseAlta } from "src/app/model/genericResponseAlta";
import { Usuario } from "../../../../model/usuario"

export const ALTA_USUARIO = createAction('[Usuario] Alta Usuario',
    props<{ usuario: Usuario }>()
);

export const ALTA_USUARIO_OK = createAction(
    '[Usuario] Alta usuario OK',
    props<{ dataUsuario: GenericResponseAlta<Usuario> }>()
);

export const ALTA_USUARIO_ERROR = createAction(
    '[Usuario] Alta usuario error',
    props<{ dataUsuario: GenericResponseAlta<Usuario> }>()
);