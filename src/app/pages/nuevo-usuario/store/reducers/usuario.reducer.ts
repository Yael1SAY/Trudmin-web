import { Action, createReducer, on } from '@ngrx/store';
import { GenericResponseError } from 'src/app/model/generic-response-error';
import { GenericResponseAlta } from 'src/app/model/genericResponseAlta';
import { Usuario } from 'src/app/model/usuario';
import { ALTA_USUARIO, ALTA_USUARIO_OK, ALTA_USUARIO_ERROR } from '../../store/actions/usuarios.actions';

export interface UsuarioState {
    user: Usuario
    dataUsuario: GenericResponseAlta<Usuario>;
}

export const usuarioInitialState: UsuarioState = {
    user: null,
    dataUsuario: null,
};

export const _usuarioReducer = createReducer(
    usuarioInitialState,
    on(ALTA_USUARIO, (state, { usuario }) => ({
        ...state,
        user: { ...usuario },
    })),
    on(ALTA_USUARIO_OK, (state, { dataUsuario }) => ({
        ...state,
        dataUsuario: { ...dataUsuario },
    })),
    on(ALTA_USUARIO_ERROR, (state, { dataUsuario }) => ({
        ...state,
        dataUsuario: { ...dataUsuario }
    })),
);

export function usuarioReducers(state: UsuarioState, action: Action) {
    return _usuarioReducer(state, action);
}