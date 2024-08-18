import { Routes } from "@angular/router";

import { StatisticsComponent } from "./components/statistics/statistics.component";
import { ActivitiesComponent } from "./pages/activities/activities.component";
import { AttendanceComponent } from "./pages/attendance/attendance.component";
import { ConfigurationComponent } from "./pages/configuration/configuration.component";
import { DayComponent } from "./pages/day/day.component";
import { WeekComponent } from "./pages/week/week.component";
import { WelcomeComponent } from "./pages/welcome/welcome.component";

export const appRoutes: Routes = [
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
        path: "attendance",
        component: AttendanceComponent,
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
