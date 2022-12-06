import { Action, createReducer, on } from "@ngrx/store";
import { Bono } from "src/app/model/bono";
import { GenericResponse } from "src/app/model/generic-response";
import { OBTENER_MIS_BONOS, OBTENER_MIS_BONOS_OK, OBTENER_MIS_BONOS_ERROR } from "../actions/mis-bonos.actions";


export interface MisBonosState {
    anio: number,
    empleadoId: number,
    dataMisBonos: GenericResponse<Bono>
}

export const misBonosInitialState: MisBonosState = {
    anio: null,
    empleadoId: null,
    dataMisBonos: null
}

export const _misBonosReducer = createReducer(
    misBonosInitialState,
    on(OBTENER_MIS_BONOS, (state, { anio, empleadoId }) => ({
        ...state,
        anio: anio,
        empleadoId: empleadoId
    })),
    on(OBTENER_MIS_BONOS_OK, (state, { dataMisBonos }) => ({
        ...state,
        dataMisBonos: { ...dataMisBonos }
    })),
    on(OBTENER_MIS_BONOS_ERROR, (state, { dataMisBonos }) => ({
        ...state,
        dataMisBonos: { ...dataMisBonos }
    })),
)

export function misBonosReducer(state: MisBonosState, action: Action) {
    return _misBonosReducer(state, action);
}