import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { storageVersionActions } from "../../../app/redux/actions/storage-version.actions";
import * as get from "../../../app/redux/selectors";
import { ApplicationState } from "../../../app/redux/states/application-state";
import { IStorageVersion } from "../../../app/redux/states/storage-version";
import { activityTypeActions } from "../../../entities/activity-types/activity-types.actions";
import {
    IActivityType,
    IActivityTypes,
} from "../../../entities/activity-types/activity-types.types";

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

        this.store.dispatch(storageVersionActions.checkStorageVersion());
    }

    public createActivityType(name: string) {
        this.store.dispatch(activityTypeActions.create({ name }));
    }
}
