import { Component, OnInit } from '@angular/core';

import * as fromStore from '../../redux/selectors';
import { ApplicationState } from '../../redux/states/applicationState';
import { Store } from '@ngrx/store';
import { SetWeeklyWorkHoursAction, SetWeeklyWorkDaysAction } from '../../redux/actions/configurationActions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  public workingHoursPerWeek$!: Observable<number>;

  public workingDaysPerWeek$!: Observable<number>;

  public inputWorkingHoursPerWeek?: number;

  public inputWorkingDaysPerWeek?: number;

  constructor(public store: Store<ApplicationState>) { }

  ngOnInit() {
    this.workingHoursPerWeek$ = this.store.select(fromStore.weeklyWorkingHours);
    this.workingDaysPerWeek$ = this.store.select(fromStore.weeklyWorkingDays);
  }

  public applyValues() {
    if (this.inputWorkingHoursPerWeek) {
      this.store.dispatch(new SetWeeklyWorkHoursAction(this.inputWorkingHoursPerWeek));
    }
    if (this.inputWorkingDaysPerWeek) {
      this.store.dispatch(new SetWeeklyWorkDaysAction(this.inputWorkingDaysPerWeek));
    }
  }

  public setInputWorkingHoursPerWeek(value: number | string) : void {
    this.inputWorkingHoursPerWeek = typeof value === "string"? Number.parseFloat(value) : value;
  }

  public setInputWorkingDaysPerWeek(value: number | string) : void {
    this.inputWorkingHoursPerWeek = typeof value === "string"? Number.parseFloat(value) : value;
  }
}
