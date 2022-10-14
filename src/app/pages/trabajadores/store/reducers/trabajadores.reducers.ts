import { Action, createReducer, on } from "@ngrx/store";
import { GenericResponse } from "src/app/model/generic-response";
import { PaginationModel } from "src/app/model/paginationModel";
import { Trabajadores } from "src/app/model/trabajadores";
import { OBTENER_TRABAJADORES, OBTENER_TRABAJADORES_SUCCESS, OBTENER_TRABAJADORES_ERROR, ALTA_TRABAJADOR, ALTA_TRABAJADOR_SUCCESS } from "../acctions/trabajadores.actions";


export interface TrabajadoresState {
    payload?: any;
    pagination?: PaginationModel;
    dataGet?: GenericResponse<Trabajadores>;
    dataHigh?: GenericResponse<Trabajadores>;
    error?: any;
}

export const trabajadoresInitialState: TrabajadoresState = {
    payload: null,
    pagination: null,
    dataGet: null,
    dataHigh: null,
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
    })),
    on(ALTA_TRABAJADOR, (state, { nuevoTrabajador }) => ({
        ...state,
        nuevoTrabajador: { ...nuevoTrabajador }
    })),
    on(ALTA_TRABAJADOR_SUCCESS, (state, { dataNuevoTrabajador }) => ({
        ...state,
        dataHigh: { ...dataNuevoTrabajador }
    })),
)

export function trabajadoresReducer(state: TrabajadoresState, action: Action) {
    return _trabajadoresReducer(state, action);
}