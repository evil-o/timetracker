import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { AttendanceState, IAttendanceEntry, AttendanceEntry, IAttendanceCorrection } from '../../redux/states/attendanceState';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as get from '../../redux/selectors';
import { ApplicationState } from '../../redux/states/applicationState';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  public date$ = new BehaviorSubject<Date>(new Date());

  // TODO these and start/endDatePicking are copies from DayComponent; introduce common header component
  public pickingDate = false;
  @ViewChild('datePickerInput')
  private datePickerInput: ElementRef;
  @ViewChild('datePicker')
  private datePicker: ElementRef;

  constructor(public store: Store<ApplicationState>) {
  }

  ngOnInit() {
  }

  startDatePicking() {
    this.pickingDate = true;
    this.datePickerInput.nativeElement.focus();
    (this.datePicker as any).show();
  }

  endDatePicking() {
    const date = new Date(this.datePickerInput.nativeElement.value);
    this.pickingDate = false;
    this.date$.next(date);
  }
}
