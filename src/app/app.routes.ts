import { RouterModule, Routes } from '@angular/router';

import { TodayComponent } from './pages/today/today.component';

export const appRoutes: Routes = [
  {
    path: 'today',
    component: TodayComponent
  },
];
