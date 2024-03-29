import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, pipe, tap } from "rxjs";
import { UsuarioService } from "src/app/services/usuario.service";
import { altaUsuario, altaUsuarioError, altaUsuarioSuccess } from "../actions";


@Injectable()
export class UsuarioEffects {

    constructor(private actions$: Actions, private usuarioServices: UsuarioService) {

    }

    altaUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType(altaUsuario),
            tap(data => console.log('effect tap', data)),
            mergeMap(
                (action) => this.usuarioServices.registrarUsuario(action.usuario)
                    .pipe(
                        // map(data => altaUsuarioSuccess({ usuario: data })),
                        // catchError(err => 
                        //     of(altaUsuarioError({ payload: err }))
                        // )
                        map((data) => {
                            console.log('respuesta de servicio: ', data);
                            return altaUsuarioSuccess({usuario: data})
                        }),
                        catchError((error) =>
                        of(altaUsuarioError({ payload: error }))
                        )
                    )
            )
        )
    )
}