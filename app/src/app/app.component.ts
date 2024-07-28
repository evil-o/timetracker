import { Component, OnInit } from '@angular/core';


import { ApplicationState } from './redux/states/applicationState';

import { Store } from '@ngrx/store';
import { IActivityTypes } from './redux/states/activityTypes';
import { IActivityType } from './models/interfaces';
import { CreateActivityTypeAction } from './redux/actions/activityTypesActions';

import * as get from './redux/selectors';
import { IStorageVersion } from './redux/states/storageVersion';
import { CheckStorageVersionAction } from './redux/actions/storageVersionActions';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private activityTypes$: Observable<IActivityTypes>;
  public activities$!: Observable<IActivityType[]>;
  private storageVersion$: Observable<IStorageVersion>;

  public storageUpdateComplete$: Observable<boolean>;

  constructor(private store: Store<ApplicationState>) {
    this.activityTypes$ = this.store.select(get.activityTypes);
    this.storageVersion$ = this.store.select(get.storageVersion);
    this.storageUpdateComplete$ = this.storageVersion$.pipe(map((version) => version.upgradeComplete));
  }

  ngOnInit() {
    this.activities$ = this.activityTypes$.pipe(map(types => types.activities));

    this.store.dispatch(new CheckStorageVersionAction());
  }

  public createActivityType(name: string) {
    this.store.dispatch(new CreateActivityTypeAction(name));
  }
}