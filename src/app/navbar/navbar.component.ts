import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { Store } from '@ngrx/store';
import { ExportStorageAction, ImportStorageAction } from '../redux/actions/storageVersionActions';
import { IAttendanceWithTimes } from '../redux/selectors/index';
import { ApplicationState } from '../redux/states/applicationState';

import * as fromStore from '../redux/selectors';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('importFileSelector')
  private importFileElement!: ElementRef;

  public entries = [
    { label: 'Today', link: 'today', icon: 'calendar' },
    { label: 'Week', link: 'week', icon: 'calendar-alt' },
    { label: 'Activities', link: 'activities', icon: 'paper-plane' },
    { label: 'Statistics', link: 'statistics', icon: 'chart-bar' },
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
    const dlAnchorElem = document.getElementById('downloadElement');
    this.store.dispatch(new ExportStorageAction(dlAnchorElem!));
  }

  importStorage() {
    const element = this.importFileElement.nativeElement as HTMLInputElement;
    this.store.dispatch(new ImportStorageAction(element!.files!));
  }

  importStorageOpenFile() {
    this.importFileElement.nativeElement.click();
  }
}
