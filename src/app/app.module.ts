import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ActivityPickerComponent } from './components/activity-picker/activity-picker.component';

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
import { GroupActivityLogEntriesByIdPipe } from './pipes/group-activity-log-entries-by-id.pipe';
import { WeekComponent } from './pages/week/week.component';
import { TallyComponent } from './components/tally/tally.component';
import { LogEntryTallyPipe } from './pipes/log-entry-tally.pipe';
import { ActivityTypeIdToNamePipe } from './pipes/activity-type-id-to-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ActivityPickerComponent,
    TodayComponent,
    ActvityLogListComponent,
    GroupActivityLogEntriesByIdPipe,
    WeekComponent,
    TallyComponent,
    LogEntryTallyPipe,
    ActivityTypeIdToNamePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
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
