import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TabsModule } from "ngx-bootstrap/tabs";
import { ActivityLogEntitiesModule } from "../entities/activity-log/activity-log-entities.module";
import { ActivityTypeEntitiesModule } from "../entities/activity-type/activity-type-entities.module";
import { ActivityAggregationFeaturesModule } from "../features/activity-aggregation/activity-aggregation-features.module";
import { AcivityColorFeaturesModule } from "../features/activity-color/activity-color-features.module";
import { LegacyModule } from "../shared/legacy.module";
import { SharedModule } from "../shared/shared.module";
import { ActivityLogWidgetsModule } from "../widgets/activity-log/activity-log-widgets.module";
import { ActivityTypesListWidgetsModule } from "../widgets/activity-types-list/activity-types-list-widgets.module";
import { NavigationWidgetsModule } from "../widgets/navigation/navigation-widgets.module";
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
        NavigationWidgetsModule,
        ActivityTypesListWidgetsModule,
        AcivityColorFeaturesModule,
        ActivityLogWidgetsModule,
        ActivityAggregationFeaturesModule,
        SharedModule,
        ActivityLogEntitiesModule,
        ActivityTypeEntitiesModule,

        // external dependencies
        BrowserModule,
        BsDatepickerModule,
        CommonModule,
        LegacyModule,
        TabsModule,
        RouterModule,
    ],
})
export class PagesModule {}
