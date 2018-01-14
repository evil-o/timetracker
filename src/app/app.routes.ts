import { RouterModule, Routes } from '@angular/router';

import { TodayComponent } from './pages/today/today.component';
import { WeekComponent } from './pages/week/week.component';

export const appRoutes: Routes = [
  {
    path: 'today',
    component: TodayComponent,
  },
  {
    path: 'week/current',
    component: WeekComponent,
  }
];
