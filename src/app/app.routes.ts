import { RouterModule, Routes } from '@angular/router';

import { DayComponent } from './pages/day/day.component';
import { WeekComponent } from './pages/week/week.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'today',
    pathMatch: 'full',
  },
  {
    path: 'today',
    component: DayComponent,
  },
  {
    path: 'week/:year/:week',
    component: WeekComponent,
  },
  {
    path: 'week',
    component: WeekComponent,
  }
];
