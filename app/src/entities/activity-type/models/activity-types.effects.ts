import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { map } from "rxjs";
import { storageVersionActions } from "../../storage-version";

@Injectable()
export class ActivityTypesEffects {
    public incrementalMigrationComplete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(storageVersionActions.incrementalMigration),
            map(() =>
                storageVersionActions.incrementalMigrationSuccess({
                    updatedState: "ActivityTypesState",
                })
            )
        )
    );

    public constructor(private actions$: Actions) {}
}
