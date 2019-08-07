import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { IMPORT_STORAGE, ImportStorageAction, IMPORT_STORAGE_FILE, ImportStorageFileAction } from '../actions/storageVersionActions';
import { Subject } from 'rxjs/Subject';
import { ApplicationState } from '../states/applicationState';
import { ImportAttendanceAction } from '../actions/attendanceActions';
import { ImportActivityTypes } from '../actions/activityTypesActions';
import { ImportActivitiesAction } from '../actions/activityLogActions';

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
  @Effect() importFileList$: Observable<Action> = this.actions$
    .ofType(IMPORT_STORAGE)
    .switchMap((action: ImportStorageAction) => {
      const actions: Action[] = [];
      for (let i = 0; i < action.files.length; ++i) {
        actions.push(new ImportStorageFileAction(action.files[i]));
      }
      return actions;
    });

  @Effect() importFile$: Observable<Action> = this.actions$
    .ofType(IMPORT_STORAGE_FILE)
    .switchMap((action: ImportStorageFileAction) => {
      const obs = new Subject<string>();
      const reader = new FileReader();
      reader.onloadend = (ev) => {
        obs.next((ev.target as any).result);
        obs.complete();
      };
      reader.readAsText(action.file, 'utf-8');
      return obs;
    })
    .map(rawContents => correctStateTypes(JSON.parse(rawContents)))
    .switchMap((data) => {
      const actions: Action[] = [];
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
    });

  constructor(
    private actions$: Actions,
  ) { }
}
