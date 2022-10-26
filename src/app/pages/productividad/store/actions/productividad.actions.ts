import { createAction, props } from "@ngrx/store";
import { GenericResponse } from "src/app/model/generic-response";
import { ProductividadEficiencia } from "src/app/model/productividad-eficiencia";


export const OBTENER_PRODUCTIVIDAD = createAction('[Productividad] Obtener productividad',
props<{filtros: any}>()
);

export const OBTENER_PRODUCTIVIDAD_OK = createAction('[Productividad] Obtener productividad OK',
    props<{dataProductividad: GenericResponse<ProductividadEficiencia>}>()
);