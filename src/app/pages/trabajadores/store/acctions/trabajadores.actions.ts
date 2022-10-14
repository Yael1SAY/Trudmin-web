import { createAction, props } from "@ngrx/store";
import { AltaTrabajador } from "src/app/model/altaTrabajador";
import { GenericResponse } from "src/app/model/generic-response";
import { PaginationModel } from "src/app/model/paginationModel";
import { Trabajadores } from "src/app/model/trabajadores";


export const OBTENER_TRABAJADORES = createAction(
    '[Trabajadores] obtener trabajadores',
    props<{ pagination: PaginationModel }>()
);

export const OBTENER_TRABAJADORES_SUCCESS = createAction(
    '[Trabajadores] obtener trabajadores success',
    props<{ trabajadoresResponse: GenericResponse<Trabajadores> }>()
);

export const OBTENER_TRABAJADORES_ERROR = createAction(
    '[Trabajadores] obtener trabajadores error',
    props<{ payload: any }>()
);

export const ALTA_TRABAJADOR = createAction(
    '[Trabajadores] alta trabajador',
    props<{ nuevoTrabajador: AltaTrabajador }>()
)

export const ALTA_TRABAJADOR_SUCCESS = createAction(
    '[Trabajadores] alta trabajador success',
    props<{ dataNuevoTrabajador: GenericResponse<Trabajadores> }>()
)