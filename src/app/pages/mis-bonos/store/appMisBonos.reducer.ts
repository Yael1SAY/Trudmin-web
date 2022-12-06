import { ActionReducerMap } from "@ngrx/store";
import { misBonosReducer, MisBonosState } from "./reducers/mis-bonos.reducers";


export interface AppMisBonosState {
    misBonos: MisBonosState;
}

export const appMisBonosReducer: ActionReducerMap<AppMisBonosState> = {
    misBonos: misBonosReducer,
}