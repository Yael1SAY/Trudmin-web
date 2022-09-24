import { ActionReducerMap } from '@ngrx/store';
import { UsuarioState, usuarioReducers } from './reducers/usuario.reducer';


export interface AppUsuarioState {
    newUsuario: UsuarioState
}

export const appUsuarioReducers: ActionReducerMap<AppUsuarioState> = {
    newUsuario: usuarioReducers,
}