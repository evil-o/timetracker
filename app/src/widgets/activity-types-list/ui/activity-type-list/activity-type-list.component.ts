import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import {
    activityTypeActions,
    IActivityType,
} from "../../../../entities/activity-type";
import { ApplicationState } from "../../../../entities/application";

@Component({
    selector: "app-activity-type-list",
    templateUrl: "./activity-type-list.component.html",
    standalone: false,
})
export class ActivityTypeListComponent {
    @Output() public mergeRequest = new EventEmitter<IActivityType>();

    public sortedTypes?: IActivityType[];

    public _types?: IActivityType[];

    public constructor(private store: Store<ApplicationState>) {}

    public get types(): IActivityType[] | undefined {
        return this._types;
    }

    @Input() public set types(value: IActivityType[] | undefined | null) {
        this._types = value ? [...value] : undefined;
        this.sortedTypes = this._types?.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    public setArchived(id: string, value: boolean) {
        this.store.dispatch(
            activityTypeActions.setArchived({ id, archived: value })
        );
    }

    public setNonWorking(id: string, value: boolean) {
        this.store.dispatch(
            activityTypeActions.setNonWorking({ id, isNonWorking: value })
        );
    }

    public setColor(activityId: string, colorId?: string) {
        this.store.dispatch(
            activityTypeActions.setColorId({
                activityTypeId: activityId,
                colorId,
            })
        );
    }
}
