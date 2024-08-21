import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { ApplicationState } from "../../../app/redux/states/application-state";
import { activityTypeActions } from "../../../entities/activity-types/activity-types.actions";
import { IActivityType } from "../../../entities/activity-types/activity-types.types";

@Component({
    selector: "app-activity-type-list",
    templateUrl: "./activity-type-list.component.html",
    styleUrls: ["./activity-type-list.component.css"],
})
export class ActivityTypeListComponent {
    @Output() public mergeRequest = new EventEmitter<IActivityType>();

    _types?: IActivityType[];
    @Input() set types(value: IActivityType[] | undefined | null) {
        this._types = value ? [...value] : undefined;
        this.sortedTypes = this._types?.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }
    get types(): IActivityType[] | undefined {
        return this._types;
    }

    sortedTypes?: IActivityType[];

    constructor(private store: Store<ApplicationState>) {}

    setArchived(id: string, value: boolean) {
        this.store.dispatch(
            activityTypeActions.setArchived({ id, archived: value })
        );
    }

    setNonWorking(id: string, value: boolean) {
        this.store.dispatch(
            activityTypeActions.setNonWorking({ id, isNonWorking: value })
        );
    }

    setColor(activityId: string, colorId?: string) {
        this.store.dispatch(
            activityTypeActions.setColorId({
                activityTypeId: activityId,
                colorId,
            })
        );
    }
}
