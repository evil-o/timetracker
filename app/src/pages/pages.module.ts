import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { TabsModule } from "ngx-bootstrap/tabs";
import { ActivityLogEntitiesModule } from "../entities/activity-log";
import { ActivityTypeEntitiesModule } from "../entities/activity-type";
import { ActivityAggregationFeaturesModule } from "../features/activity-aggregation";
import { AcivityColorFeaturesModule } from "../features/activity-color";
import { SharedModule } from "../shared/shared.module";
import { ActivityLogWidgetsModule } from "../widgets/activity-log";
import { ActivityTypesListWidgetsModule } from "../widgets/activity-types-list";
import { AttendanceWidgetsModule } from "../widgets/attendance";
import { NavigationWidgetsModule } from "../widgets/navigation";
import { ActivitiesComponent } from "./activities/activities.component";
import { ConfigurationComponent } from "./configuration/configuration.component";
import { DayComponent } from "./day";
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
        AttendanceWidgetsModule,
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
        CommonModule,
        TabsModule,
        RouterModule,
    ],
})
export class PagesModule {}
