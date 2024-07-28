import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map } from 'rxjs';
import { FetchOrCreateIdAndLogTimeAction } from '../actions/activityLogActions';
import { CREATE_ACTIVITY_TYPE_AND_LOG_TIME, CreateActivityTypeAndLogTimeAction } from '../actions/activityTypesActions';
import { INCREMENTAL_MIGRATION, IncrementalMigrationSuccessAction } from '../actions/storageVersionActions';

@Injectable()
export class ActivityTypesEffects {
  incrementalMigrationComplete$ = createEffect(() => this.actions$.pipe(
    ofType(INCREMENTAL_MIGRATION),
    map(() => new IncrementalMigrationSuccessAction('ActivityTypesState'))
  ));

  createAndLogTime$ = createEffect(() => this.actions$.pipe(
    ofType(CREATE_ACTIVITY_TYPE_AND_LOG_TIME),
    map((action: CreateActivityTypeAndLogTimeAction) =>
      new FetchOrCreateIdAndLogTimeAction(action.name, action.hours, action.date, action.description)
    )
  ));

  constructor(
    private actions$: Actions,
  ) { }
}
