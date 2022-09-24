import { ActionReducerMap } from '@ngrx/store';
import { usuariosReducer, UsuariosState} from './reducers/usuarios.reducers';


export interface AppUsuariosState {
    usuarios: UsuariosState
}

export const appUsuariosReducers: ActionReducerMap<AppUsuariosState> = {
    usuarios: usuariosReducer,
}