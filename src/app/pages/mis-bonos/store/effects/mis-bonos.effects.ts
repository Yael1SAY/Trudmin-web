import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { MisBonosService } from "src/app/services/mis-bonos.service";
import { OBTENER_MIS_BONOS, OBTENER_MIS_BONOS_OK, OBTENER_MIS_BONOS_ERROR } from "../actions/mis-bonos.actions";

@Injectable()
export class MisBonosEffects {
    
    constructor(private actions$: Actions, private misBonosService: MisBonosService ) {}

    misBonos$ = createEffect(
        () => this.actions$.pipe(
            ofType(OBTENER_MIS_BONOS),
            tap(data => console.log('effect tap', data)),
            mergeMap(
                (action) => this.misBonosService.obtenerMisBonos(action.empleadoId, action.anio)
                .pipe(
                    map((data) => {
                        console.log("respuesta al ejecutar servicio: ", data)
                        return OBTENER_MIS_BONOS_OK({dataMisBonos: data});
                    }),
                    catchError((error) => 
                    of(OBTENER_MIS_BONOS_ERROR({dataMisBonos: error.error})))
                )
            )
        )
    )

}