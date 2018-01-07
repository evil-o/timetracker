import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ActivityPickerComponent } from './activity-picker/activity-picker.component';
import { CurrentWeekComponent } from './pages/current-week/current-week.component';

import { StoreModule } from '@ngrx/store';

import { activityTypesReducer } from './redux/reducers/activityTypes';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ActivityPickerComponent,
    CurrentWeekComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    StoreModule.forRoot({ activityTypes: activityTypesReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
