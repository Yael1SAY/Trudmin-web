import { ActionReducerMap } from '@ngrx/store';
import { productividadReducer, productividadState} from './reducers/gestion-productividad.reducers';


export interface appProductividadesState {
    listProductividades: productividadState,
    altaProductividades: productividadState,
}

export const APP_PRODUCTIVIDADES_REDUCER: ActionReducerMap<appProductividadesState> = {
    listProductividades: productividadReducer,
    altaProductividades: productividadReducer,
}

/**--------------------------------------------------------------------------------------------------------------------------------- */
// export interface appAltaProductividadState {
//     altaProductividades: productividadState
// }

// export const appAltaProductividadesReducers: ActionReducerMap<appAltaProductividadState> = {
//     altaProductividades: productividadReducer,
// }