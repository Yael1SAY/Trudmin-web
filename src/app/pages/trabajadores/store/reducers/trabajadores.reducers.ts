import { Action, createReducer, on } from "@ngrx/store";
import { GenericResponse } from "src/app/model/generic-response";
import { PaginationModel } from "src/app/model/paginationModel";
import { Trabajadores } from "src/app/model/trabajadores";
import { OBTENER_TRABAJADORES, OBTENER_TRABAJADORES_SUCCESS, OBTENER_TRABAJADORES_ERROR } from "../acctions/trabajadores.actions";


export interface TrabajadoresState {
    payload?: any;
    pagination?: PaginationModel;
    dataGet?: GenericResponse<Trabajadores>;
    loaded?: boolean;
    loading?: boolean;
    error?: any;
}

export const trabajadoresInitialState: TrabajadoresState = {
    payload: null,
    pagination: null,
    loaded: false,
    loading: false,
    error: null,
};

export const _trabajadoresReducer = createReducer(
    trabajadoresInitialState,
    on(OBTENER_TRABAJADORES, (state, { pagination }) => ({
        ...state,
        pagination: { ...pagination }
    })),
    on(OBTENER_TRABAJADORES_SUCCESS, (state, { trabajadoresResponse }) => ({
        ...state,
        dataGet: { ...trabajadoresResponse }
    })),
    on(OBTENER_TRABAJADORES_ERROR, (state, { payload }) => ({
        ...state,
        pagination: { ...payload }
    }))
)

export function trabajadoresReducer(state: TrabajadoresState, action: Action) {
    return _trabajadoresReducer(state, action);
}