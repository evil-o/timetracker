import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map } from 'rxjs';
import { activityTypeActions } from '../actions/activity-types.actions';
import { stopWatchActions } from '../actions/stop-watch.actions';
import { INCREMENTAL_MIGRATION, IncrementalMigrationSuccessAction } from '../actions/storageVersionActions.legacy';

@Injectable()
export class ActivityTypesEffects {
  incrementalMigrationComplete$ = createEffect(() => this.actions$.pipe(
    ofType(INCREMENTAL_MIGRATION),
    map(() => new IncrementalMigrationSuccessAction('ActivityTypesState'))
  ));

  createAndLogTime$ = createEffect(() => this.actions$.pipe(
    ofType(activityTypeActions.createAndLogTime),
    map((action) =>
      stopWatchActions.fetchOrCreateIdAndLogTime({ name: action.name, hoursToLog: action.hours, date: action.date, description: action.description })
    )
  ));

  constructor(
    private actions$: Actions,
  ) { }
}
