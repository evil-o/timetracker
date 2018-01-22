import { RouterModule, Routes } from '@angular/router';

import { DayComponent } from './pages/day/day.component';
import { WeekComponent } from './pages/week/week.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
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
