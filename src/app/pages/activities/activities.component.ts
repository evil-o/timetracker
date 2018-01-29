import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../redux/states/applicationState';
import { Observable } from 'rxjs/Observable';
import { IActivityType } from '../../models/interfaces';

import * as fromStore from '../../redux/selectors';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  public activities$: Observable<IActivityType[]>;

  constructor(public store: Store<ApplicationState>) {
    this.activities$ = store.select(fromStore.activityTypes).map(types => types.activities);
  }

  ngOnInit() {
  }

}
