import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map } from 'rxjs';
import { activityLogActions } from '../actions/activity-log.actions';
import { activityTypeActions } from '../actions/activity-types.actions';
import { storageVersionActions } from '../actions/storage-version.actions';

@Injectable()
export class ActivityTypesEffects {
  incrementalMigrationComplete$ = createEffect(() => this.actions$.pipe(
    ofType(storageVersionActions.incrementalMigration),
    map(() => storageVersionActions.incrementalMigrationSuccess({ updatedState: 'ActivityTypesState' }))
  ));

  createAndLogTime$ = createEffect(() => this.actions$.pipe(
    ofType(activityTypeActions.createAndLogTime),
    map((action) =>
      activityLogActions.fetchOrCreateIdAndLogTime({ name: action.name, hoursToLog: action.hours, date: action.date, description: action.description })
    )
  ));

  constructor(
    private actions$: Actions,
  ) { }
}
