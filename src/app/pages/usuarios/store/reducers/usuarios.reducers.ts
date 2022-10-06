import { Action, createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/model/usuario';
import { obtenerUsuarios, obtenerUsuariosError, obtenerUsuariosSuccess } from '../acctions/usuarios.actions';

export interface UsuariosState {
    payload: any;
    loaded: boolean;
    loading: boolean;
    error: any;
}

export const usuariosInitialState: UsuariosState = {
    payload: null,
    loaded: false,
    loading: false,
    error: null,
};

export const _usuariosReducer = createReducer(
    usuariosInitialState,
    on(obtenerUsuarios, state => ({
        ...state,
        loading: true,
    })),
    on(obtenerUsuariosSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: true,
        payload: {...payload},
    })),
    on(obtenerUsuariosError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { ...payload }
    })),
);

export function usuariosReducer(state: UsuariosState, action: Action) {
    return _usuariosReducer(state, action)
}
