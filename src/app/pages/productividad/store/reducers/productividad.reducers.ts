import { Action, createReducer, on } from "@ngrx/store";
import { GenericResponse } from "src/app/model/generic-response";
import { ProductividadEficiencia } from "src/app/model/productividad-eficiencia";
import { OBTENER_PRODUCTIVIDAD, OBTENER_PRODUCTIVIDAD_OK } from "../actions/productividad.actions";

export interface productividadState {
    dataProductividad: GenericResponse<ProductividadEficiencia>;
}

export const productividadInitialState: productividadState = {
    dataProductividad: null
}

export const _productividadReducer = createReducer(
    productividadInitialState,
    on(OBTENER_PRODUCTIVIDAD, (state, {filtros}) => ({
        ...state,
        filtros: {...filtros}
    })),
    on(OBTENER_PRODUCTIVIDAD_OK, (state, {dataProductividad}) => ({
        ...state,
        dataProductividad: {...dataProductividad}
    }))
)

export function productividadReducer (state: productividadState, action: Action) {
    return _productividadReducer(state, action);
}