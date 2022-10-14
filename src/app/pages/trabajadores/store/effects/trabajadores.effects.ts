import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { TrabajadoresService } from "src/app/services/trabajadores.service";
import { OBTENER_TRABAJADORES, OBTENER_TRABAJADORES_SUCCESS, OBTENER_TRABAJADORES_ERROR, ALTA_TRABAJADOR, ALTA_TRABAJADOR_SUCCESS } from "../acctions/trabajadores.actions";

@Injectable()
export class TrabajadoresEffects {

    constructor (private actions$: Actions, private trabajadoresServices: TrabajadoresService) {}

    obtenerTrabajadores$ = createEffect(
        () => this.actions$.pipe(
            ofType(OBTENER_TRABAJADORES),
            tap(data => console.log('effect get trabajadores', data)),
            mergeMap(
                (data) => this.trabajadoresServices.obtenerTrabajadores(data.pagination)
                .pipe(
                    map((data) => {
                        return OBTENER_TRABAJADORES_SUCCESS({trabajadoresResponse: data})
                    }),
                    catchError((error) => 
                        of(OBTENER_TRABAJADORES_ERROR({payload: error}))
                    )
                )
            )
        )
    );


    altaTrabajador$ = createEffect(
        () => this.actions$.pipe(
            ofType(ALTA_TRABAJADOR),
            tap(data => console.log('effect get trabajadores', data)),
            mergeMap(
                (data) => this.trabajadoresServices.altaTrabajador(data.nuevoTrabajador)
                .pipe(
                    map((data) => {
                        return ALTA_TRABAJADOR_SUCCESS({dataNuevoTrabajador: data})
                    })
                )
            )
        )
    )
}