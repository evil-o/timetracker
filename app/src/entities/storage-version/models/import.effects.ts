import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { map, switchMap } from "rxjs";
import { activityLogActions, IActivityLogStateSlice } from "../../activity-log";
import {
    activityTypeActions,
    IActivityTypesStateSlice,
} from "../../activity-type";
import { attendanceActions, IAttendanceStateSlice } from "../../attendance";
import { storageVersionActions } from "./storage-version.actions";

function correctAttendance(state: Partial<IAttendanceStateSlice>) {
    if (state.attendanceState) {
        for (const entry of state.attendanceState.entries) {
            entry.date = new Date(entry.date);
            entry.start = entry.start ? new Date(entry.start) : undefined;
            entry.end = entry.end ? new Date(entry.end) : undefined;
            entry.corrections = entry.corrections
                ? entry.corrections.map((c) => ({
                      ...c,
                      hours: Number.parseFloat(`${c.hours}`),
                  }))
                : undefined;
        }
    }
}

function correctActivityEntries(state: Partial<IActivityLogStateSlice>) {
    if (state.activityLog) {
        for (const entry of state.activityLog.entries) {
            entry.year = Number.parseInt(`${entry.year}`);
            entry.month = Number.parseInt(`${entry.month}`);
            entry.day = Number.parseInt(`${entry.day}`);
            entry.hours = Number.parseFloat(`${entry.hours}`);
        }
    }
}

/**
 * N.B.: Modifies the input! Returns it as a curtesy ;)
 */
function correctStateTypes(
    state: IActivityLogStateSlice &
        IAttendanceStateSlice &
        IActivityTypesStateSlice
): IActivityLogStateSlice & IAttendanceStateSlice & IActivityTypesStateSlice {
    correctAttendance(state);
    correctActivityEntries(state);
    return state;
}

@Injectable()
export class ImportStorageEffects {
    importFile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(storageVersionActions.importStorageFile),
            map(({ fileContent }) =>
                correctStateTypes(JSON.parse(fileContent))
            ),
            switchMap((data) => {
                const actions: Action[] = [];
                console.log("importing", data);
                // import states in order of dependencies
                if (data.attendanceState) {
                    actions.push(
                        attendanceActions.import({ data: data.attendanceState })
                    );
                }
                if (data.activityTypes) {
                    actions.push(
                        activityTypeActions.import({ data: data.activityTypes })
                    );
                }
                if (data.activityLog) {
                    actions.push(
                        activityLogActions.importActivities({
                            data: data.activityLog,
                        })
                    );
                }
                return actions;
            })
        )
    );

    constructor(private actions$: Actions) {}
}
