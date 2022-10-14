import { ActionReducerMap } from "@ngrx/store";
import { trabajadoresReducer, TrabajadoresState } from "./reducers/trabajadores.reducers";


export interface appTrabajadoresState {
    listTrabajadores: TrabajadoresState,
    altaTrabajador: TrabajadoresState
}

export const APP_TRABAJADORES_REDUCER: ActionReducerMap<appTrabajadoresState> = {
    listTrabajadores: trabajadoresReducer,
    altaTrabajador: trabajadoresReducer
}