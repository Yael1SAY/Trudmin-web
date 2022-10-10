import { ActionReducerMap } from "@ngrx/store";
import { trabajadoresReducer, TrabajadoresState } from "./reducers/trabajadores.reducers";


export interface appTrabajadoresState {
    listTrabajadores: TrabajadoresState,
}

export const APP_PRODUCTIVIDADES_REDUCER: ActionReducerMap<appTrabajadoresState> = {
    listTrabajadores: trabajadoresReducer,
}