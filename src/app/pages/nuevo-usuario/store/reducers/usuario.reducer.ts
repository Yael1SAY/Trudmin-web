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
    on(altaUsuario, (state, { usuarioNew }) => ({
        ...state,
        user: { ...usuarioNew },
    })),
    on(altaUsuarioSuccess, (state, { usuarioNew }) => ({
        ...state,
        user: { ...usuarioNew },
    })),
    on(altaUsuarioError, (state, { payload }) => ({
        ...state,
        user: { ...payload }
    })),
);

export function usuarioReducers(state: UsuarioState | undefined, action: Action) {
    return _usuarioReducer(state, action);
}