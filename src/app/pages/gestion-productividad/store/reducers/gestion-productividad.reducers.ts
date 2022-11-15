import { Action, createReducer, on } from "@ngrx/store";
import { GenericResponse } from "src/app/model/generic-response";
import { GenericResponseError } from "src/app/model/generic-response-error";
import { GenericResponseAlta } from "src/app/model/genericResponseAlta";
import { PaginationModel } from "src/app/model/paginationModel";
import { Productividad } from "src/app/model/productividad";
import {
    ALTA_PRODUCTIVIDAD,
    ALTA_PRODUCTIVIDAD_OK,
    ALTA_PRODUCTIVIDAD_ERROR,
    GET_LIST_PRODUCTIVIDADES, GET_LIST_PRODUCTIVIDADES_SUCCESS
} from "../actions/gestion-productividad.actions";


export interface productividadState {
    dataGet?: GenericResponse<Productividad>;
    dataProductividad?: GenericResponseAlta<Productividad>;
    dataError?: GenericResponseError,
    pagination: PaginationModel,
    error?: any;
}

export const productividadInitialState: productividadState = {
    dataGet: null,
    dataProductividad: null,
    dataError: null,
    pagination: null,
    error: null,
};

export const _productividadReducer = createReducer(
    productividadInitialState,
    on(GET_LIST_PRODUCTIVIDADES, (state, { pagination }) => ({
        ...state,
        pagination: {...pagination}
    })),
    on(GET_LIST_PRODUCTIVIDADES_SUCCESS, (state, { productividadesResponse }) => ({
        ...state,
        dataGet: { ...productividadesResponse },
    })),
    on(ALTA_PRODUCTIVIDAD, (state, { productividad }) => ({
        ...state,
        productividad: { ...productividad },
    })),
    on(ALTA_PRODUCTIVIDAD_OK, (state, { dataProductividad }) => ({
        ...state,
        dataProductividad: { ...dataProductividad },
    })),
    on(ALTA_PRODUCTIVIDAD_ERROR, (state, { dataProductividad }) => ({
        ...state,
        dataProductividad: { ...dataProductividad },
    })),
)

export function productividadReducer(state: productividadState, action: Action) {
    return _productividadReducer(state, action);
}