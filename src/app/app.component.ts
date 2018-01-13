import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { ApplicationState } from './redux/states/applicationState';

import { Store } from '@ngrx/store';
import { IActivityTypes } from './redux/states/activityTypes';
import { IActivityType } from './models/interfaces';
import { CreateActivityTypeAction } from './redux/actions/activityTypesActions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private activityTypes$: Observable<IActivityTypes>;
  public activities$: Observable<IActivityType[]>;

  constructor(private store: Store<ApplicationState>) {
    this.activityTypes$ = this.store.select('activityTypes');
  }

  ngOnInit() {
    this.activities$ = this.activityTypes$.map(types => types.activities);
  }

  public createActivityType(name: string) {
    this.store.dispatch(new CreateActivityTypeAction(name));
  }
}
