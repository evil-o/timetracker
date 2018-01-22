import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/withLatestFrom';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { LogTimeAction, FETCH_OR_CREATE_ID_AND_LOG_TIME, FetchOrCreateIdAndLogTimeAction } from '../actions/activityLogActions';
import { ApplicationState } from '../states/applicationState';
import { INCREMENTAL_MIGRATION, IncrementalMigrationAction, IncrementalMigrationSuccessAction } from '../actions/storageVersionActions';
import { CreateActivityTypeAndLogTimeAction } from '../actions/activityTypesActions';

@Injectable()
export class ActivityLogEffects {
  // Listen for the 'LOGIN' action
  @Effect() newActivityTypeLogged$: Observable<Action> = this.actions$
  .ofType(FETCH_OR_CREATE_ID_AND_LOG_TIME)
  .map(action => action as FetchOrCreateIdAndLogTimeAction)
  .withLatestFrom(this.store$)
  .map(([action, state]) => {
    const found = state.activityTypes.activities.find((activity) => activity.name === action.name);
    if (found) {
      return new LogTimeAction(found.id, action.hoursToLog, action.date);
    } else {
      return new CreateActivityTypeAndLogTimeAction(action.name, action.hoursToLog, action.date);
    }
  });

  @Effect() incrementalMigrationComplete$: Observable<Action> = this.actions$
  .ofType(INCREMENTAL_MIGRATION)
  .map(() => new IncrementalMigrationSuccessAction('ActivityLogState'));

  constructor(
    private actions$: Actions,
    private store$: Store<ApplicationState>
  ) {}
}
