import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { ApplicationState } from '../../redux/states/applicationState';
import { IActivityLogEntry } from '../../redux/states/activityLog';
import * as fromStore from '../../redux/selectors';
import { IActivityTypes } from '../../redux/states/activityTypes';

import * as currentWeekNumber from 'current-week-number';

interface DayDeclaration {
  dayOfTheWeek: number;

  name: string;

  entries$: Observable<IActivityLogEntry[]>;
}

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {

  public activityLogEntries$: Observable<IActivityLogEntry[]>;
  public activityTypes$: Observable<IActivityTypes>;

  public year: number;

  public week: number;

  days: DayDeclaration[] = [];

  constructor(private store: Store<ApplicationState>) {
    if (!this.year || !this.week) {
      const today = new Date();
      this.year = today.getFullYear();
      this.week = currentWeekNumber(today);
    }

    this.activityTypes$ = this.store.select(fromStore.activityTypes);
    this.activityLogEntries$ = this.store.select(fromStore.activityLogEntries);

    const weekdayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    weekdayNames.forEach((weekdayName, index) => {
      const dayOfTheWeek = index;
      this.days.push({
        name: weekdayName,
        dayOfTheWeek,
        entries$: this.activityLogEntries$.map((entries) => entries.filter((entry) => {
          // TODO also filter by selected year, week of the component
          const date = new Date(entry.year, entry.month, entry.day);
          return date.getUTCDay() === dayOfTheWeek;
        }))
      });
    });
   }

  ngOnInit() {
  }

}
