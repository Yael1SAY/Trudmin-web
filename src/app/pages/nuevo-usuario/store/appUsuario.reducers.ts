import { ActionReducerMap } from '@ngrx/store';
import { UsuarioState, usuarioReducers } from './reducers/usuario.reducer';


export interface AppUsuarioState {
    usuario: UsuarioState
}

export const appUsuarioReducers: ActionReducerMap<AppUsuarioState> = {
    usuario: usuarioReducers,
}