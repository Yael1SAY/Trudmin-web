import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, pipe, tap } from "rxjs";
import { UsuarioService } from "src/app/services/usuario.service";
import { ALTA_USUARIO, ALTA_USUARIO_OK, ALTA_USUARIO_ERROR } from "../../store/actions/usuarios.actions";


@Injectable()
export class UsuarioEffects {

    constructor(private actions$: Actions, private usuarioServices: UsuarioService) { }

    altaUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType(ALTA_USUARIO),
            tap(data => console.log('effect tap', data)),
            mergeMap(
                (action) => this.usuarioServices.registrarUsuario(action.usuario)
                    .pipe(
                        map((data) => {
                            console.log("respuesta al ejecutar servicio: ", data)
                            return ALTA_USUARIO_OK({dataUsuario: data})
                        }),
                        catchError((error) =>
                        of(ALTA_USUARIO_ERROR({ dataUsuario: error.error }))
                        )
                    )
            )
        )
    )
}