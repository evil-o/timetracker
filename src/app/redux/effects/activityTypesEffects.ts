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
import { CREATE_ACTIVITY_TYPE_AND_LOG_TIME, CreateActivityTypeAndLogTimeAction } from '../actions/activityTypesActions';

@Injectable()
export class ActivityTypesEffects {

  @Effect() incrementalMigrationComplete$: Observable<Action> = this.actions$
    .ofType(INCREMENTAL_MIGRATION)
    .map(() => new IncrementalMigrationSuccessAction('ActivityTypesState'));

  @Effect() createAndLogTime$: Observable<Action> = this.actions$
    .ofType(CREATE_ACTIVITY_TYPE_AND_LOG_TIME)
    .map((action: CreateActivityTypeAndLogTimeAction) =>
      new FetchOrCreateIdAndLogTimeAction(action.name, action.hours, action.date, action.description)
    );

  constructor(
    private actions$: Actions,
    private store$: Store<ApplicationState>
  ) { }
}
