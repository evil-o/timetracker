import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { ImportActivitiesAction } from '../actions/activityLogActions.legacy';
import { ImportActivityTypes } from '../actions/activityTypesActions.legacy';
import { ImportAttendanceAction } from '../actions/attendanceActions.legacy';
import { IMPORT_STORAGE_FILE } from '../actions/storageVersionActions.legacy';
import { ApplicationState } from '../states/applicationState';

function correctAttendance(state: Partial<ApplicationState>) {
  if (state.attendanceState) {
    for (const entry of state.attendanceState.entries) {
      entry.date = new Date(entry.date);
      entry.start = entry.start ? new Date(entry.start) : undefined;
      entry.end = entry.end ? new Date(entry.end) : undefined;
      entry.corrections = entry.corrections ?
        entry.corrections.map((c) => ({ ...c, hours: Number.parseFloat(c.hours as any) }))
        : undefined;
    }
  }
}

function correctActivityEntries(state: Partial<ApplicationState>) {
  if (state.activityLog) {
    for (const entry of state.activityLog.entries) {
      entry.year = Number.parseInt(entry.year as any);
      entry.month = Number.parseInt(entry.month as any);
      entry.day = Number.parseInt(entry.day as any);
      entry.hours = Number.parseFloat(entry.hours as any);
    }
  }
}

/**
 * N.B.: Modifies the input! Returns it as a curtesy ;)
 */
function correctStateTypes(state: Partial<ApplicationState>): Partial<ApplicationState> {
  correctAttendance(state);
  correctActivityEntries(state);
  return state;
}

@Injectable()
export class ImportStorageEffects {
  importFile$ = createEffect(() => this.actions$.pipe(
    ofType(IMPORT_STORAGE_FILE),
    map(({ fileContent }) => correctStateTypes(JSON.parse(fileContent))),
    switchMap((data) => {
      const actions: Action[] = [];
      console.log("importing", data);
      // import states in order of dependencies
      if (data.attendanceState) {
        actions.push(new ImportAttendanceAction(data.attendanceState));
      }
      if (data.activityTypes) {
        actions.push(new ImportActivityTypes(data.activityTypes));
      }
      if (data.activityLog) {
        actions.push(new ImportActivitiesAction(data.activityLog));
      }
      return actions;
    })
  ));

  constructor(
    private actions$: Actions,
  ) { }
}
