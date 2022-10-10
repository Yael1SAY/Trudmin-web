import { createAction, props } from "@ngrx/store";
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