import { Component, OnInit } from '@angular/core';

import * as fromStore from '../../redux/selectors';
import { Observable } from 'rxjs/Observable';
import { IConfigurationState } from '../../redux/states/configuration';
import { ApplicationState } from '../../redux/states/applicationState';
import { Store } from '@ngrx/store';
import { SetWeeklyWorkHoursAction } from '../../redux/actions/configurationActions';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  public workingHoursPerWeek$: Observable<number>;

  public inputWorkingHoursPerWeek: number;

  constructor(public store: Store<ApplicationState>) { }

  ngOnInit() {
    this.workingHoursPerWeek$ = this.store.select(fromStore.weeklyWorkingHours);
  }

  public applyValues() {
    this.store.dispatch(new SetWeeklyWorkHoursAction(this.inputWorkingHoursPerWeek));
  }

}
