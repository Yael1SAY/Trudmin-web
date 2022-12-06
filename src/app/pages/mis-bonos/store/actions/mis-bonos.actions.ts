import { createAction, props } from "@ngrx/store";
import { Bono } from "src/app/model/bono";
import { GenericResponse } from "src/app/model/generic-response";

export const OBTENER_MIS_BONOS = createAction('[Mis Bonos], Obteber mis bonos', 
props<{ anio: number, empleadoId: number }>()
);

export const OBTENER_MIS_BONOS_OK = createAction('[Mis Bonos], Obteber mis bonos OK', 
props<{ dataMisBonos: GenericResponse<Bono> }>()
);

export const OBTENER_MIS_BONOS_ERROR = createAction('[Mis Bonos], Obteber mis bonos error', 
props<{ dataMisBonos: GenericResponse<Bono> }>()
);