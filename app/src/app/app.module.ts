import { NgModule } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";

import { FormsModule } from "@angular/forms";

import { AppComponent } from "./ui/app.component";

import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { environment } from "../environments/environment";

import { effects } from "../entities/application/effects";
import { metaReducers } from "../entities/application/meta-reducers";
import { reducers } from "../entities/application/reducers";

import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { provideCharts, withDefaultRegisterables } from "ng2-charts";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ModalModule } from "ngx-bootstrap/modal";
import { TabsModule } from "ngx-bootstrap/tabs";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";

import { PagesModule } from "../pages/pages.module";
import { routes } from "../pages/pages.routes";

@NgModule({
    declarations: [AppComponent],
    imports: [
        PagesModule,
        BrowserModule,
        CommonModule,
        FormsModule,
        ModalModule.forRoot(),
        AccordionModule.forRoot(),
        BsDropdownModule.forRoot(),
        BsDatepickerModule.forRoot(),
        TabsModule.forRoot(),
        TypeaheadModule.forRoot(),
        StoreModule.forRoot(reducers, { metaReducers }),
        !environment.production
            ? StoreDevtoolsModule.instrument({
                  maxAge: 25, // Retains last 25 states
              })
            : [],
        EffectsModule.forRoot(effects),
        RouterModule.forRoot(routes),
    ],
    providers: [provideCharts(withDefaultRegisterables()), provideAnimations()],
    bootstrap: [AppComponent],
})
export class AppModule {}
