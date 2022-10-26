import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, tap } from "rxjs";
import { ProductividadService } from "src/app/services/productividad.service";
import { OBTENER_PRODUCTIVIDAD, OBTENER_PRODUCTIVIDAD_OK } from "../actions/productividad.actions";

@Injectable()
export class productividadEffects {

    constructor(private actions$: Actions, private productividad: ProductividadService){}

    obtenerProductividad$ = createEffect(
        () => this.actions$.pipe(
            ofType(OBTENER_PRODUCTIVIDAD),
            tap(data => console.log('effect tap', data)),
            mergeMap(
                (action) => this.productividad.obtenerProductividadEficiencia(action)
                .pipe(
                    map((data) => {
                        console.log('Respuesta al ejecutr accion obtener productividad: ', data)
                        return OBTENER_PRODUCTIVIDAD_OK({dataProductividad: data})
                    })
                )
            )
        )
    )
}