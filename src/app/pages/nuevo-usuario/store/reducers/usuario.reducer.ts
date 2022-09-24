import { Action, createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/model/usuario';
import { altaUsuario, altaUsuarioError, altaUsuarioSuccess } from '../../store/actions/usuarios.actions';

export interface UsuarioState {
    user: Usuario;
}

export const usuarioInitialState: UsuarioState = {
    user: null,
};

export const _usuarioReducer = createReducer(
    usuarioInitialState,
    on(altaUsuario, (state, { usuario }) => ({
        ...state,
        user: { ...usuario },
    })),
    on(altaUsuarioSuccess, (state, { usuario }) => ({
        ...state,
        user: { ...usuario },
    })),
    on(altaUsuarioError, (state, { payload }) => ({
        ...state,
        user: { ...payload }
    })),
);

export function usuarioReducers(state: UsuarioState | undefined, action: Action) {
    return _usuarioReducer(state, action);
}