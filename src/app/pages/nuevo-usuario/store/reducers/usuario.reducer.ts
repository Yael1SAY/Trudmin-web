import { Action, createReducer, on, State } from '@ngrx/store';
import { Usuario } from 'src/app/model/usuario';
import { altaUsuario, altaUsuarioError, altaUsuarioSuccess } from '../actions/index';

export interface UsuarioState {
    user: Usuario;
    loaded: boolean
    loading: boolean
    error: any;
}

export const usuarioInitialState: UsuarioState = {
    user: null,
    loaded: false,
    loading: false,
    error: null,
};

export const _usuarioReducer = createReducer(
    usuarioInitialState,
    on(altaUsuario, (state, { usuario }) => ({
        ...state,
        loading: false,
        loaded: true,
        user: { ...usuario },
    })),
    on(altaUsuarioSuccess, (state, { usuario }) => ({
        ...state,
        loading: false,
        loaded: false,
        user: { ...usuario },
    })),
    on(altaUsuarioError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { ...payload }
    })),
);

// export function usuarioReducers(state , action: Action) {
//     return _usuarioReducer(state, action);
// }