import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { Subject } from 'rxjs/Subject';
// TODO: this should be the line, but combineLatest does not work with it
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/combinelatest';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/zip';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ApplicationState } from '../../redux/states/applicationState';
import { IActivityLogEntry } from '../../redux/states/activityLog';
import * as fromStore from '../../redux/selectors';
import { IActivityTypes } from '../../redux/states/activityTypes';

import { HtmlTableGenerator, Row, Cell, HeaderCell } from '../../models/htmlTableGenerator';

import * as currentWeekNumber from 'current-week-number';
import { SetDescriptionAction } from '../../redux/actions/activityLogActions';
import { IGroupEntry } from '../../pipes/group-activity-log-entries-by-id.pipe';
import { IAttendanceEntry } from '../../redux/states/attendanceState';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IAttendanceWithTimes } from '../../redux/selectors';

interface IDayEntry {
  dayOfTheWeek: number;

  date: Date;

  name: string;

  entries$: BehaviorSubject<IActivityLogEntry[]>;
}

interface IWeekDate {
  year: number;
  week: number;
}

interface IWeekAttendanceStats {
  totalHours: number;

  totalNonWorkingHours: number;

  totalOvertime: number;
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

  public loggedSum$: Observable<number>;

  public modalRef: BsModalRef;

  public printPreviewContents: string;

  public attendances$: Observable<IAttendanceWithTimes[]>;

  public attendanceStats$: Observable<IWeekAttendanceStats>;

  public selectedTab: 'tally' | 'daily' | 'attendance' = 'tally';

  constructor(
    private store: Store<ApplicationState>,
    public activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
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
          const filteredEntries = entries.filter((entry) => {
            const date = new Date(entry.year, entry.month, entry.day);
            return date.getUTCDay() === dayOfTheWeek;
          });

          days.push({
            name: weekdayName,
            dayOfTheWeek,
            date: new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + index),
            entries$: new BehaviorSubject(filteredEntries),
          });
        });

        return days;
      });

    this.loggedSum$ = this.filteredLogEntries$.map(v => v.map(d => d.hours)).map(v => v.reduce((prev, curr) => prev + curr, 0));

    this.days$.withLatestFrom(this.activityTypes$).subscribe(([days, types]) => {
      this.refreshPrintPreviewContents(days, types);
    });

    this.attendances$ = Observable.combineLatest(
      this.store.select(fromStore.attendanceEntriesWithOvertime),
      this.week$,
    ).map(([entries, week]) => entries.filter(e => {
      const entryWeek = currentWeekNumber(e.date);
      return e.date.getFullYear() === week.year && entryWeek === week.week;
    }));

    this.attendanceStats$ = this.attendances$.map((attendances) => {
      let totalHours = 0;
      let totalNonWorkingHours = 0;
      let totalOvertime = 0;

      for (const attendance of attendances) {
        totalHours += attendance.hours;
        totalNonWorkingHours += attendance.nonWorkingHours;
        totalOvertime += attendance.overtime;
      }

      return { totalHours, totalNonWorkingHours, totalOvertime };
    });
  }

  ngOnInit() { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openLargeModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      {
        class: 'modal-lg'
      });
  }

  refreshPrintPreviewContents(days: IDayEntry[], types: IActivityTypes) {
    const root = document.createElement('div');
    const h = root.appendChild(document.createElement('h1'));
    h.innerText = `Week ${this.week.week} / ${this.week.year}`;

    const table = new HtmlTableGenerator();
    table.border = '1pt';
    table.header.appendHeadingRow('Activity', 'Hours');

    const activityName = (id: string) => types.activities.find((t) => t.id === id).name;
    for (const day of days) {
      const hs1 = table.body.appendHeadingSpan(`${day.name}, ${day.date.getMonth() + 1} / ${day.date.getDate()}`, 2);
      hs1.bgColor = '#D0D0D0';

      if (day.entries$.value.length <= 0) {
        table.body.appendSpan(`<i>No entries.</i>`, 2);
        continue;
      }

      const byId: IGroupEntry[] = [];
      for (const entry of day.entries$.value) {
        const id = entry.actvitiyId;
        const idEntry = byId.find((item) => item.activityId === id);
        if (idEntry) {
          idEntry.cumulativeHours += entry.hours;
          idEntry.entries.push(entry);
        } else {
          byId.push({
            activityId: id,
            cumulativeHours: entry.hours,
            entries: [entry],
          });
        }
      }

      for (const group of byId) {
        table.body.appendHeadingRow(activityName(group.activityId), `&sum; ${group.cumulativeHours} h`);

        for (const subentry of group.entries) {
          table.body.appendRow(subentry.description || '&mdash;', `${subentry.hours} h`);
        }
      }
    }

    table.appendTo(root);

    this.printPreviewContents = root.innerHTML;
  }

  savePrint() {
    const a = document.getElementById('printDownload');
    // TODO pad is copied from storageVersion effects, put this somewhere and reuse it
    const pad = (n: number, width = 2, fill = '0') => {
      let n_str = `${n}`;
      if (n_str.length < width) {
        n_str = fill.repeat(width - n_str.length) + n_str;
      }
      return n_str;
    };

    const now = new Date();
    const downloadName = `Timesheet-${this.week.year}-${pad(this.week.week)}`;

    const html = `<!DOCTYPE html><html><head><title>Timesheet</title><meta charset="utf-8"><body>${this.printPreviewContents}</body><html>`;

    const dataStr = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);
    a.setAttribute('href', dataStr);
    a.setAttribute('download', downloadName + '.html');
    a.click();

    this.modalRef.hide();
  }
}
