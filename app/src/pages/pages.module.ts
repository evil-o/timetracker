import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TabsModule } from "ngx-bootstrap/tabs";
import { ActivityTypesModule } from "../entities/activity-types/activity-types.module";
import { AcivityColorFeaturesModule } from "../features/activity-color/activity-color-features.module";
import { LegacyModule } from "../shared/legacy.module";
import { ActivityTypesListWidgetsModule } from "../widgets/activity-types-list/activity-types-list-widgets.module";
import { WidgetsModule } from "../widgets/widgets.module";
import { ActivitiesComponent } from "./activities/activities.component";
import { ConfigurationComponent } from "./configuration/configuration.component";
import { DayComponent } from "./day/day.component";
import { MainComponent } from "./layouts/main/main.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { WeekComponent } from "./week/week.component";
import { WelcomeComponent } from "./welcome/welcome.component";

const pages = [
    ActivitiesComponent,
    ConfigurationComponent,
    DayComponent,
    MainComponent,
    StatisticsComponent,
    WeekComponent,
    WelcomeComponent,
];

@NgModule({
    declarations: [...pages],
    exports: [...pages],
    imports: [
        WidgetsModule,
        ActivityTypesListWidgetsModule,
        AcivityColorFeaturesModule,

        // external dependencies
        BrowserModule,
        BsDatepickerModule,
        CommonModule,
        LegacyModule,
        TabsModule,
        RouterModule,

        // entities
        ActivityTypesModule,
    ],
})
export class PagesModule {}
