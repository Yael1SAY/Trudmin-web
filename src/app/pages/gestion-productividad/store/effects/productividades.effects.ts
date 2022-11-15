import { DataSource } from "@angular/cdk/collections";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { ProductividadService } from "src/app/services/productividad.service";
import { 
    ALTA_PRODUCTIVIDAD,
    ALTA_PRODUCTIVIDAD_OK,
    ALTA_PRODUCTIVIDAD_ERROR,
    // altaProductividad, altaProductividadSuccess, 
    GET_LIST_PRODUCTIVIDADES, GET_LIST_PRODUCTIVIDADES_SUCCESS } from "../actions/gestion-productividad.actions";

@Injectable()
export class ProductividadesEffects {

    constructor(private actions$: Actions, private productividadServices: ProductividadService) {

    }

    obtenerProductividades$ = createEffect(
        () => this.actions$.pipe(
            ofType(GET_LIST_PRODUCTIVIDADES),
            tap(data => console.log('effect getProductividades', data)),
            mergeMap(
                (data) => this.productividadServices.obtenerProductividadesPage(data.pagination)
                    .pipe(
                        map((data) => {
                            return GET_LIST_PRODUCTIVIDADES_SUCCESS({productividadesResponse: data})
                        }),
                    )
            )
        )
    )

    altaProductividad$ = createEffect(
        () => this.actions$.pipe(
            ofType(ALTA_PRODUCTIVIDAD),
            tap(data => console.log('effect altaProductividad', data)),
            mergeMap(
                (data) => this.productividadServices.altaDeProductividad(data.productividad)
                    .pipe(
                        map((data) => {
                            return ALTA_PRODUCTIVIDAD_OK({dataProductividad: data})
                        }),
                        catchError((error) =>
                        of(ALTA_PRODUCTIVIDAD_ERROR({ dataProductividad: error.error }))
                        )
                    )
            )
        )
    )

}