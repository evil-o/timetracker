import { Component, Input } from "@angular/core";
import { AccordionComponent } from "ngx-bootstrap/accordion";
import { ApplicationState } from "../../../../entities/application";

import { Store } from "@ngrx/store";
import {
    activityLogActions,
    IGroupEntry,
} from "../../../../entities/activity-log";
import {
    activityColors,
    IActivityTypes,
} from "../../../../entities/activity-type";

@Component({
    selector: "app-activity-log-entry",
    templateUrl: "./activity-log-entry.component.html",
    providers: [AccordionComponent],
    standalone: false,
})
export class ActivityLogEntryComponent {
    public customColorClass = "";

    public confirmDelete?: string;

    public _group!: IGroupEntry;

    private colors = activityColors;

    private _activityTypes!: IActivityTypes;

    public constructor(public store: Store<ApplicationState>) {}

    @Input()
    public set group(value: IGroupEntry) {
        this._group = value;
        this.updateCustomClass();
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    public get group(): IGroupEntry {
        return this._group;
    }

    @Input()
    public set activityTypes(value: IActivityTypes | undefined) {
        if (!value) {
            return;
        }
        this._activityTypes = value;
        this.updateCustomClass();
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    public get activityTypes(): IActivityTypes {
        return this._activityTypes;
    }

    public changeEntryDescription(params: {
        entryId: string;
        newDescription: string;
    }) {
        this.store.dispatch(
            activityLogActions.setDescription({
                entryId: params.entryId,
                description: params.newDescription,
            })
        );
    }

    public changeEntryHours(params: { entryId: string; newHours: number }) {
        this.store.dispatch(
            activityLogActions.setHours({
                entryId: params.entryId,
                hours: params.newHours,
            })
        );
    }

    public deleteEntry(id: string) {
        if (this.confirmDelete === id) {
            this.confirmDelete = undefined;
            this.store.dispatch(
                activityLogActions.deleteEntry({ entryId: id })
            );
        } else {
            console.warn(
                `Did not delete entry ${id} because it was not confirmed.`
            );
        }
    }

    private updateCustomClass() {
        if (this.group && this.activityTypes) {
            const type = this.activityTypes.activities.find(
                (t) => t.id === this.group.activityId
            );
            if (type && type.colorId) {
                const color = this.colors.find((c) => c.id === type.colorId);
                if (!color) {
                    console.warn(`Color not found for type`, type);
                    this.customColorClass = "";
                } else {
                    this.customColorClass = color!.styleClass;
                }
            } else {
                this.customColorClass = "";
            }
        }
    }
}
