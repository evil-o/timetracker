import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { Subject } from 'rxjs/Subject';
// TODO: this should be the line, but combineLatest does not work with it
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/combinelatest';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/zip';

import { ApplicationState } from '../../redux/states/applicationState';
import { IActivityLogEntry } from '../../redux/states/activityLog';
import * as fromStore from '../../redux/selectors';
import { IActivityTypes } from '../../redux/states/activityTypes';

import * as currentWeekNumber from 'current-week-number';
import { SetDescriptionAction } from '../../redux/actions/activityLogActions';

interface IDayEntry {
  dayOfTheWeek: number;

  date: Date;

  name: string;

  entries: IActivityLogEntry[];
}

interface IWeekDate {
  year: number;
  week: number;
}

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css'],
})
export class WeekComponent implements OnInit {

  public activityLogEntries$: Observable<IActivityLogEntry[]>;
  public activityTypes$: Observable<IActivityTypes>;

  // log entries, filtered to only contain the ones that are in this week
  public filteredLogEntries$: Observable<IActivityLogEntry[]>;

  public nextWeek$: Observable<IWeekDate>;
  public nextWeek: IWeekDate;

  public week$: Observable<IWeekDate>;
  public week: IWeekDate;

  public previousWeek$: Observable<IWeekDate>;
  public previousWeek: IWeekDate;

  public days$: Observable<IDayEntry[]>;

  constructor(
    private store: Store<ApplicationState>,
    public activatedRoute: ActivatedRoute,
  ) {

    this.week$ = this.activatedRoute.params.map((parameters) => {
      let year = Number(parameters['year']);
      let week = Number(parameters['week']);
      if (Number.isNaN(year) || Number.isNaN(week)) {
        const today = new Date();
        year = today.getFullYear();
        week = currentWeekNumber(today);
      }
      return { year, week };
    });

    this.week$.subscribe((week) => this.week = week);

    this.activityTypes$ = this.store.select(fromStore.activityTypes);
    this.activityLogEntries$ = this.store.select(fromStore.activityLogEntries);

    this.previousWeek$ = this.week$
      .map((week) => {
        let previousWeek = week.week - 1;
        let previousWeekYear = week.year;
        if (previousWeek < 1) {
          previousWeek = 52;
          previousWeekYear -= 1;
        }

        return { year: previousWeekYear, week: previousWeek };
      });

    this.previousWeek$.subscribe((value) => {
      this.previousWeek = value;
    });

    this.nextWeek$ = this.week$
      .map((week) => {
        let nextWeek = week.week + 1;
        let nextWeekYear = week.year;
        if (nextWeek > 52) {
          nextWeek = 1;
          nextWeekYear += 1;
        }

        return { year: nextWeekYear, week: nextWeek };
      });

    this.nextWeek$.subscribe((value) => {
      this.nextWeek = value;
    });

    this.filteredLogEntries$ =
      Observable.combineLatest(this.week$, this.activityLogEntries$)
        .map(([week, entries]) => {
          return entries.filter((entry) => {
            const date = new Date(entry.year, entry.month, entry.day);
            return entry.year === week.year && currentWeekNumber(date) === week.week;
          });
        });

    this.days$ = this.filteredLogEntries$
      .map((entries) => {
        const days: IDayEntry[] = [];
        const weekdayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        // calculate the start date of the week
        const startOfWeek = new Date(this.week.year, 0, 1 + 7 * (this.week.week - 1));
        // - 1: javascript week starts on sunday
        startOfWeek.setDate(startOfWeek.getDate() - ((startOfWeek.getDay() + 6) % 7));

        weekdayNames.forEach((weekdayName, index) => {
          const dayOfTheWeek = index;
          days.push({
            name: weekdayName,
            dayOfTheWeek,
            date: new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + index),
            entries: entries.filter((entry) => {
              const date = new Date(entry.year, entry.month, entry.day);
              return date.getUTCDay() === dayOfTheWeek;
            })
          });
        });

        return days;
      });
  }

  ngOnInit() { }
}
