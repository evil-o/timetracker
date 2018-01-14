import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ActivityPickerComponent } from './activity-picker/activity-picker.component';
import { CurrentWeekComponent } from './pages/current-week/current-week.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { activityTypesReducer } from './redux/reducers/activityTypes';
import { TodayComponent } from './pages/today/today.component';

import { appRoutes } from './app.routes';
import { ActivityLogEffects } from './redux/effects/activityLogEffects';
import { reducers } from './redux/reducers/index';
import { effects } from './redux/effects/index';
import { metaReducers } from './redux/metaReducers';
import { ActvityLogListComponent } from './components/actvity-log-list/actvity-log-list.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ActivityPickerComponent,
    CurrentWeekComponent,
    TodayComponent,
    ActvityLogListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AccordionModule.forRoot(),
    NgbModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ?
      StoreDevtoolsModule.instrument({
        maxAge: 25 // Retains last 25 states
      })
      : [],
    EffectsModule.forRoot(effects),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
