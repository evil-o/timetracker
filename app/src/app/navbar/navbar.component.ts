import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { Store } from '@ngrx/store';
import { ExportStorageAction, ImportStorageAction } from '../redux/actions/storageVersionActions';
import { IAttendanceWithTimes } from '../redux/selectors/index';
import { ApplicationState } from '../redux/states/applicationState';

import { Observable } from 'rxjs';
import * as fromStore from '../redux/selectors';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('importFileSelector')
  private importFileElement!: ElementRef;

  public entries = [
    { label: 'Today', link: 'today', icon: 'calendar', id: 'today' },
    { label: 'Week', link: 'week', icon: 'calendar-alt', id: 'week' },
    { label: 'Activities', link: 'activities', icon: 'paper-plane', id: 'activities' },
    { label: 'Statistics', link: 'statistics', icon: 'chart-bar', id: 'statistics' },
  ];

  @Output()
  public createActivityEvent = new EventEmitter<string>();

  public attendances$: Observable<IAttendanceWithTimes[]>;

  public overallAttendanceSum$: Observable<number | undefined>;

  constructor(private store: Store<ApplicationState>) {
    this.attendances$ = this.store.select(fromStore.attendanceEntriesWithOvertime);

    this.overallAttendanceSum$ = this.store.select(fromStore.overtimeSum);
  }

  ngOnInit() {
  }

  public createActivity(name: string) {
    this.createActivityEvent.emit(name);
  }

  downloadStorage() {
    this.store.dispatch(new ExportStorageAction());
  }

  importStorage() {
    const element = this.importFileElement.nativeElement as HTMLInputElement;
    this.store.dispatch(new ImportStorageAction(element!.files!));
  }

  importStorageOpenFile() {
    this.importFileElement.nativeElement.click();
  }
}
