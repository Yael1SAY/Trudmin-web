import { Action, createReducer, on } from "@ngrx/store";
import { GenericResponse } from "src/app/model/generic-response";
import { Productividad } from "src/app/model/productividad";
import { 
    ALTA_PRODUCTIVIDADES,
    ALTA_PRODUCTIVIDADES_SUCCESS,
    // altaProductividad, altaProductividadSuccess, 
    GET_LIST_PRODUCTIVIDADES, GET_LIST_PRODUCTIVIDADES_SUCCESS } from "../actions/gestion-productividad.actions";


export interface productividadState {
    dataGet?: GenericResponse;
    dataHigh?: GenericResponse;
    loaded: boolean;
    loading: boolean;
    error?: any;
}

export const productividadInitialState: productividadState = {
    dataGet: null,
    dataHigh: null,
    loaded: false,
    loading: false,
    error: null,
};

export const _productividadReducer = createReducer(
    productividadInitialState,
    on(GET_LIST_PRODUCTIVIDADES, state => ({
        ...state,
        loading: true,
    })),
    on(GET_LIST_PRODUCTIVIDADES_SUCCESS, (state,{ productividadesResponse }) => ({
        ...state,
        loading: false,
        loaded: true,
        dataGet: {...productividadesResponse},
    })),
    on(ALTA_PRODUCTIVIDADES, (state, {altaProductividades}) => ({
        ...state,
        loading: false,
        loaded: true,
        productividad: {...altaProductividades},
    })),
    on(ALTA_PRODUCTIVIDADES_SUCCESS, (state, {altaProductividades}) => ({
        ...state,
        loading: false,
        loaded: true,
        dataHigh: {...altaProductividades},
    })),
)

export function productividadReducer(state: productividadState, action: Action) {
    return _productividadReducer(state, action);
}