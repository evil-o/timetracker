import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { map, withLatestFrom } from 'rxjs';
import { FETCH_OR_CREATE_ID_AND_LOG_TIME, FetchOrCreateIdAndLogTimeAction, LogTimeAction } from '../actions/activityLogActions';
import { CreateActivityTypeAndLogTimeAction } from '../actions/activityTypesActions';
import { INCREMENTAL_MIGRATION, IncrementalMigrationSuccessAction } from '../actions/storageVersionActions';
import { ApplicationState } from '../states/applicationState';

@Injectable()
export class ActivityLogEffects {
  newActivityTypeLogged$ = createEffect(() => this.actions$.pipe(
    ofType(FETCH_OR_CREATE_ID_AND_LOG_TIME),
    map(action => action as FetchOrCreateIdAndLogTimeAction),
    withLatestFrom(this.store$),
    map(([action, state]) => {
      const found = state.activityTypes.activities.find((activity) => activity.name === action.name);
      if (found) {
        return new LogTimeAction(found.id, action.hoursToLog, action.date, action.description);
      } else {
        return new CreateActivityTypeAndLogTimeAction(action.name, action.hoursToLog, action.date, action.description);
      }
    })
  ));

  incrementalMigrationComplete$ = createEffect(() => this.actions$.pipe(
    ofType(INCREMENTAL_MIGRATION),
    map(() => new IncrementalMigrationSuccessAction('ActivityLogState'))
  ));

  constructor(
    private actions$: Actions,
    private store$: Store<ApplicationState>
  ) { }
}
