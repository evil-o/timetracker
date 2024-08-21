import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";

import { map, withLatestFrom } from "rxjs";
import { ApplicationState } from "../../app/redux/states/application-state";
import { activityTypeActions } from "../activity-types/activity-types.actions";
import { storageVersionActions } from "../storage-version/storage-version.actions";
import { activityLogActions } from "./activity-log.actions";

@Injectable()
export class ActivityLogEffects {
    newActivityTypeLogged$ = createEffect(() =>
        this.actions$.pipe(
            ofType(activityLogActions.fetchOrCreateIdAndLogTime),
            withLatestFrom(this.store$),
            map(([action, state]) => {
                const found = state.activityTypes.activities.find(
                    (activity) => activity.name === action.name
                );
                if (found) {
                    return activityLogActions.logTime({
                        id: found.id,
                        hoursToLog: action.hoursToLog,
                        date: action.date,
                        description: action.description,
                    });
                } else {
                    return activityTypeActions.createAndLogTime({
                        name: action.name,
                        hours: action.hoursToLog,
                        date: action.date,
                        description: action.description,
                        createIfExists: true,
                    });
                }
            })
        )
    );

    incrementalMigrationComplete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(storageVersionActions.incrementalMigration),
            map(() =>
                storageVersionActions.incrementalMigrationSuccess({
                    updatedState: "ActivityLogState",
                })
            )
        )
    );

    constructor(
        private actions$: Actions,
        private store$: Store<ApplicationState>
    ) {}
}
