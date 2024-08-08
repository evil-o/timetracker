import { Component, OnInit } from '@angular/core';


import { ApplicationState } from './redux/states/application-state';

import { Store } from '@ngrx/store';
import { IActivityType } from './models/interfaces';
import { IActivityTypes } from './redux/states/activity-types';

import { map, Observable } from 'rxjs';
import { activityTypeActions } from './redux/actions/activity-types.actions';
import { storageVersionActions } from './redux/actions/storage-version.actions';
import * as get from './redux/selectors';
import { IStorageVersion } from './redux/states/storage-version';

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

    this.store.dispatch(storageVersionActions.checkStorageVersion());
  }

  public createActivityType(name: string) {
    this.store.dispatch(activityTypeActions.create({ name }));
  }
}
