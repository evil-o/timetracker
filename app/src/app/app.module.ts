import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { provideCharts, withDefaultRegisterables } from "ng2-charts";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ModalModule } from "ngx-bootstrap/modal";
import { TabsModule } from "ngx-bootstrap/tabs";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { entityEffects } from "../entities/application/effects";
import { metaReducers } from "../entities/application/meta-reducers";
import { reducers } from "../entities/application/reducers";
import { environment } from "../environments/environment";
import { ActivityLogFeaturesEffects } from "../features/activity-log";
import { ActivitiesPageModule } from "../pages/activities";
import { ConfigurationPageModule } from "../pages/configuration";
import { DayPageModule } from "../pages/day";
import { LayoutsModule } from "../pages/layouts";
import { StatisticsPageModule } from "../pages/statistics";
import { WeekPageModule } from "../pages/week";
import { WelcomePageModule } from "../pages/welcome";
import { ApplicatioEffects } from "./model/application.effects";
import { routes } from "./routes/app.routes";
import { AppComponent } from "./ui/app.component";

@NgModule({
    declarations: [AppComponent],
    imports: [
        // pages
        ActivitiesPageModule,
        ConfigurationPageModule,
        DayPageModule,
        StatisticsPageModule,
        WeekPageModule,
        WelcomePageModule,
        LayoutsModule,

        // other imports
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
        EffectsModule.forRoot([
            ...entityEffects,
            ApplicatioEffects,
            ActivityLogFeaturesEffects,
        ]),
        RouterModule.forRoot(routes),
    ],
    providers: [provideCharts(withDefaultRegisterables()), provideAnimations()],
    bootstrap: [AppComponent],
})
export class AppModule {}
