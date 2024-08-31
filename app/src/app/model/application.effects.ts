import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, withLatestFrom } from "rxjs";
import { activityLogActions } from "../../entities/activity-log";
import { activityTypeActions } from "../../entities/activity-type";
import { ApplicationState } from "../../entities/application";

@Injectable()
export class ApplicatioEffects {
    public newActivityTypeLogged$ = createEffect(() =>
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

    public createAndLogTime$ = createEffect(() =>
        this.actions$.pipe(
            ofType(activityTypeActions.createAndLogTime),
            map((action) =>
                activityLogActions.fetchOrCreateIdAndLogTime({
                    name: action.name,
                    hoursToLog: action.hours,
                    date: action.date,
                    description: action.description,
                })
            )
        )
    );

    public constructor(
        private actions$: Actions,
        private store$: Store<ApplicationState>
    ) {}
}
