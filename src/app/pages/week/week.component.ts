import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { ApplicationState } from '../../redux/states/applicationState';
import { IActivityLogEntry } from '../../redux/states/activityLog';
import * as fromStore from '../../redux/selectors';
import { IActivityTypes } from '../../redux/states/activityTypes';

import * as currentWeekNumber from 'current-week-number';

interface DayDeclaration {
  dayOfTheWeek: number;

  date: Date;

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

  public nextWeekYear: number;
  public nextWeek: number;

  public year: number;
  public week: number;

  public previousWeekYear: number;
  public previousWeek: number;

  days: DayDeclaration[] = [];

  constructor(private store: Store<ApplicationState>, public activatedRoute: ActivatedRoute) {
    this.activityTypes$ = this.store.select(fromStore.activityTypes);
    this.activityLogEntries$ = this.store.select(fromStore.activityLogEntries);
   }

  ngOnInit() {
    this.activatedRoute.params.subscribe((parameters) => {
      const year = Number(parameters['year']);
      const week = Number(parameters['week']);
      if (!Number.isNaN(year) && !Number.isNaN(week)) {
        this.year = year;
        this.week = week;
      } else {
        const today = new Date();
        this.year = today.getFullYear();
        this.week = currentWeekNumber(today);
      }

      this.updatePreviousAndNextWeek();
    });
  }

  updatePreviousAndNextWeek() {
    this.previousWeek = this.week - 1;
    this.previousWeekYear = this.year;

    this.nextWeek = this.week + 1;
    this.nextWeekYear = this.year;

    if (this.previousWeek < 1) {
      this.previousWeek = 52;
      this.previousWeekYear -= 1;
    } else if (this.nextWeek > 52) {
      this.nextWeek = 1;
      this.nextWeekYear += 1;
    }

    const weekdayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    this.days = [];

    // calculate the start date of the week
    const startOfWeek = new Date(this.year, 0, 1 + 7 * (this.week - 1));
    // - 1: javascript week starts on sunday
    startOfWeek.setDate(startOfWeek.getDate() - ((startOfWeek.getDay() + 6) % 7));

    weekdayNames.forEach((weekdayName, index) => {
      const dayOfTheWeek = index;
      this.days.push({
        name: weekdayName,
        dayOfTheWeek,
        date: new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + index),
        entries$: this.activityLogEntries$.map((entries) => entries.filter((entry) => {
          const date = new Date(entry.year, entry.month, entry.day);
          if (entry.year !== this.year || currentWeekNumber(date) !== this.week) {
            return false;
          }
          return date.getUTCDay() === dayOfTheWeek;
        }))
      });
    });
  }
}
