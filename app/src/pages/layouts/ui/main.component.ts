import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import {
    activityTypeActions,
    fromActivityTypes,
    IActivityType,
    IActivityTypes,
} from "../../../entities/activity-type";
import { ApplicationState } from "../../../entities/application";
import {
    fromStorageVersion,
    IStorageVersion,
    storageVersionActions,
} from "../../../entities/storage-version";

@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
})
export class MainComponent implements OnInit {
    public activities$!: Observable<IActivityType[]>;
    public storageUpdateComplete$: Observable<boolean>;

    private activityTypes$: Observable<IActivityTypes>;
    private storageVersion$: Observable<IStorageVersion>;

    constructor(private store: Store<ApplicationState>) {
        this.activityTypes$ = this.store.select(fromActivityTypes.getState);
        this.storageVersion$ = this.store.select(fromStorageVersion.getState);
        this.storageUpdateComplete$ = this.storageVersion$.pipe(
            map((version) => version.upgradeComplete)
        );
    }

    public ngOnInit() {
        this.activities$ = this.activityTypes$.pipe(
            map((types) => types.activities)
        );

        // TODO: move to effects / app init
        this.store.dispatch(storageVersionActions.checkStorageVersion());
    }

    public createActivityType(name: string) {
        this.store.dispatch(activityTypeActions.create({ name }));
    }
}
