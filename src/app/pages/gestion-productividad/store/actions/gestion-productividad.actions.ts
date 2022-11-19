import { createAction, props } from "@ngrx/store";
import { GenericResponse } from "src/app/model/generic-response";
import { GenericResponseError } from "src/app/model/generic-response-error";
import { GenericResponseAlta } from "src/app/model/genericResponseAlta";
import { PaginationModel } from "src/app/model/paginationModel";
import { Productividad } from "src/app/model/productividad";

/**-------------------------------------------------------------------------------------------------------------------------- */
export const GET_LIST_PRODUCTIVIDADES = createAction(
    '[Gestion Productividad] Obtener lista productividad',
    props<{ pagination: PaginationModel, clave: string, anio: string }>()
);

export const GET_LIST_PRODUCTIVIDADES_SUCCESS = createAction(
    '[Gestion Productividad] Obtener productividad success',
    props<{ productividadesResponse: GenericResponse<Productividad> }>()
);
export const GET_LIST_PRODUCTIVIDADES_ERROR = createAction(
    '[Gestion Productividad] Obtener productividad error',
    props<{ productividadesResponse: GenericResponse<Productividad> }>()
);

/**-------------------------------------------------------------------------------------------------------------------------- */
export const ALTA_PRODUCTIVIDAD = createAction('[Gestion Productividad] Alta de nueva productividad',
    props<{ productividad: Productividad }>()
)
export const ALTA_PRODUCTIVIDAD_OK = createAction('[Gestion Productividad] Alta de nueva productividad success',
    props<{ dataProductividad: GenericResponseAlta<Productividad> }>());

export const ALTA_PRODUCTIVIDAD_ERROR = createAction('[Gestion Productividad] Alta de nueva productividad success',
    props<{ dataProductividad: GenericResponseAlta<Productividad> }>());

/**-------------------------------------------------------------------------------------------------------------------------- */
