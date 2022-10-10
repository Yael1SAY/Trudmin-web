import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { UsuarioService } from "src/app/services/usuario.service";
import { obtenerUsuarios, obtenerUsuariosSuccess, obtenerUsuariosError } from "../acctions/usuarios.actions";


@Injectable()
export class UsuariosEffects {

    constructor(private actions$: Actions, private usuarioServices: UsuarioService) {

    }

    obtenerUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType(obtenerUsuarios),
            tap(data => console.log('effect tap', data)),
            mergeMap(
                (data) => this.usuarioServices.obtenerUsarios(data.pagination)
                    .pipe(
                        map((data) => {
                            return obtenerUsuariosSuccess({payload: data})
                        }),
                        catchError((error) =>
                        of(obtenerUsuariosError({ payload: error }))
                        )
                    )
            )
        )
    )
}