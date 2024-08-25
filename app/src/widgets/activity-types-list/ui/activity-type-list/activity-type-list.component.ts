import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { IActivityType } from "../../../../entities/activity-type";
import { activityTypeActions } from "../../../../entities/activity-type/models/activity-types.actions";
import { ApplicationState } from "../../../../entities/application/models/application.model";

@Component({
    selector: "app-activity-type-list",
    templateUrl: "./activity-type-list.component.html",
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
