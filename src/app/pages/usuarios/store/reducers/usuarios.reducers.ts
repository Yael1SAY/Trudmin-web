import { Action, createReducer, on } from '@ngrx/store';
import { PaginationModel } from 'src/app/model/paginationModel';
import { Usuario } from 'src/app/model/usuario';
import { obtenerUsuarios, obtenerUsuariosError, obtenerUsuariosSuccess } from '../acctions/usuarios.actions';

export interface UsuariosState {
    payload: any;
    pagination: PaginationModel
    loaded: boolean;
    loading: boolean;
    error: any;
}

export const usuariosInitialState: UsuariosState = {
    payload: null,
    pagination: null,
    loaded: false,
    loading: false,
    error: null,
};

export const _usuariosReducer = createReducer(
    usuariosInitialState,
    on(obtenerUsuarios, (state, { pagination }) => ({
        ...state,
        pagination: { ...pagination },

    })),
    on(obtenerUsuariosSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: true,
        payload: { ...payload },
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
