import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { map } from "rxjs";
import { storageVersionActions } from "../../../entities/storage-version";

@Injectable()
export class ActivityLogFeaturesEffects {
    public incrementalMigrationComplete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(storageVersionActions.incrementalMigration),
            map(() =>
                storageVersionActions.incrementalMigrationSuccess({
                    updatedState: "ActivityLogState",
                })
            )
        )
    );

    public constructor(private actions$: Actions) {}
}
