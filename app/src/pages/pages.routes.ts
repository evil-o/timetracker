import { Routes } from "@angular/router";

import { ActivitiesComponent } from "./activities/activities.component";
import { ConfigurationComponent } from "./configuration/configuration.component";
import { DayComponent } from "./day/day.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { WeekComponent } from "./week/week.component";
import { WelcomeComponent } from "./welcome/welcome.component";

export const routes: Routes = [
    {
        path: "",
        component: WelcomeComponent,
    },
    {
        path: "today",
        component: DayComponent,
    },
    {
        path: "week/:year/:week",
        component: WeekComponent,
    },
    {
        path: "week",
        component: WeekComponent,
    },
    {
        path: "activities",
        component: ActivitiesComponent,
    },
    {
        path: "configuration",
        component: ConfigurationComponent,
    },
    {
        path: "statistics",
        component: StatisticsComponent,
    },
];
