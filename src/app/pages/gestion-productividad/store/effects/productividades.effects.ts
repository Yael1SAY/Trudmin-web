import { DataSource } from "@angular/cdk/collections";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, tap } from "rxjs";
import { ProductividadService } from "src/app/services/productividad.service";
import { 
    ALTA_PRODUCTIVIDADES,
    ALTA_PRODUCTIVIDADES_SUCCESS,
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
            ofType(ALTA_PRODUCTIVIDADES),
            tap(data => console.log('effect altaProductividad', data)),
            mergeMap(
                (data) => this.productividadServices.altaDeProductividad(data.altaProductividades)
                    .pipe(
                        map((data) => {
                            return ALTA_PRODUCTIVIDADES_SUCCESS({altaProductividades: data})
                        }),
                    )
            )
        )
    )

}