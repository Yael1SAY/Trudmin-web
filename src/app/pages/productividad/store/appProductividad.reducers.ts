import { ActionReducerMap } from "@ngrx/store"
import { productividadReducer, productividadState } from "./reducers/productividad.reducers"


export interface AppProductividadState {
    productividad: productividadState
}

export const appProductividadReducers: ActionReducerMap<AppProductividadState> = {
    productividad: productividadReducer,
}