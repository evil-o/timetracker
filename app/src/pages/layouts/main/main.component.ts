import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import * as get from "../../../app/redux/selectors";
import { activityTypeActions } from "../../../entities/activity-types/activity-types.actions";
import {
    IActivityType,
    IActivityTypes,
} from "../../../entities/activity-types/activity-types.types";
import { ApplicationState } from "../../../entities/application/application.model";
import { storageVersionActions } from "../../../entities/storage-version/storage-version.actions";
import { IStorageVersion } from "../../../entities/storage-version/storage-version.state";

@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
})
export class MainComponent implements OnInit {
    private activityTypes$: Observable<IActivityTypes>;
    public activities$!: Observable<IActivityType[]>;
    private storageVersion$: Observable<IStorageVersion>;

    public storageUpdateComplete$: Observable<boolean>;

    constructor(private store: Store<ApplicationState>) {
        this.activityTypes$ = this.store.select(get.activityTypes);
        this.storageVersion$ = this.store.select(get.storageVersion);
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
