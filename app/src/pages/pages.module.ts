import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TabsModule } from "ngx-bootstrap/tabs";
import { LegacyModule } from "../shared/legacy.module";
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
