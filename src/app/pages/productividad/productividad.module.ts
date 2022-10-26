import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { appProductividadReducers } from "./store/appProductividad.reducers";
import { productividadEffects } from "./store/effects/productividad.effects";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature('productividad', appProductividadReducers),
        EffectsModule.forFeature([productividadEffects]),
    ]
})
export class ProductividadModule {

}