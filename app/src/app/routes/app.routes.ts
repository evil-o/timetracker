import { Routes } from "@angular/router";

import { ActivitiesComponent } from "../../pages/activities";
import { ConfigurationComponent } from "../../pages/configuration";
import { DayComponent } from "../../pages/day";
import { StatisticsComponent } from "../../pages/statistics";
import { WeekComponent } from "../../pages/week/week.component";
import { WelcomeComponent } from "../../pages/welcome/welcome.component";

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
