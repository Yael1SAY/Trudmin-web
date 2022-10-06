import { createAction, props } from "@ngrx/store";
import { GenericResponse } from "src/app/model/generic-response";
import { PaginationModel } from "src/app/model/paginationModel";
import { Productividad } from "src/app/model/productividad";



/**-------------------------------------------------------------------------------------------------------------------------- */
export const GET_LIST_PRODUCTIVIDADES = createAction('[Gestion Productividad] Obtener lista productividad',
    props<{ pagination: PaginationModel }>()
);

export const GET_LIST_PRODUCTIVIDADES_SUCCESS = createAction('[Gestion Productividad] Obtener productividad success',
    props<{ productividadesResponse: GenericResponse }>()
);

/**-------------------------------------------------------------------------------------------------------------------------- */
export const ALTA_PRODUCTIVIDADES = createAction('[Gestion Productividad] Alta de nueva productividad',
    props<{ altaProductividades: Productividad }>()
)
export const ALTA_PRODUCTIVIDADES_SUCCESS = createAction('[Gestion Productividad] Alta de nueva productividad success',
    props<{ altaProductividades: GenericResponse }>());

/**-------------------------------------------------------------------------------------------------------------------------- */
