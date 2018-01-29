import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IActivityType } from '../models/interfaces';
import { Observable } from 'rxjs/Observable';
import { ApplicationState } from '../redux/states/applicationState';
import { Store } from '@ngrx/store';
import { ExportStorageAction } from '../redux/actions/storageVersionActions';
import { IAttendanceWithTimes, attendanceEntries } from '../redux/selectors/index';

import * as fromStore from '../redux/selectors';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public entries = [
    { label: 'Today', link: 'today', icon: 'calendar' },
    { label: 'Week', link: 'week', icon: 'calendar-alt' },
    { label: 'Attendance', link: 'attendance', icon: 'clock' },
  ];

  @Output()
  public createActivityEvent = new EventEmitter<string>();

  public attendances$: Observable<IAttendanceWithTimes[]>;

  public overallAttendanceSum$: Observable<number>;

  constructor(private store: Store<ApplicationState>) {
    this.attendances$ = this.store.select(fromStore.attendanceEntriesWithOvertime);

    this.overallAttendanceSum$ = this.attendances$.map((attendances) =>
      attendances.map(attendance => attendance.overtime).reduce((prev, cur) => prev + cur, 0)
    );
  }

  ngOnInit() {
  }

  public createActivity(name: string) {
    this.createActivityEvent.emit(name);
  }

  downloadStorage() {
    const dlAnchorElem = document.getElementById('downloadElement');
    this.store.dispatch(new ExportStorageAction(dlAnchorElem));
  }

}
