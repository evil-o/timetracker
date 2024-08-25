import { Component, Input } from "@angular/core";
import { AccordionComponent } from "ngx-bootstrap/accordion";
import { ApplicationState } from "../../../../entities/application/models/application.model";

import { Store } from "@ngrx/store";
import { activityColors } from "../../../../entities/activity-color/models/activity-color.models";
import { IGroupEntry } from "../../../../entities/activity-log/lib/group-activity-log-entries-by-id.pipe";
import { activityLogActions } from "../../../../entities/activity-log/models/activity-log.actions";
import { IActivityTypes } from "../../../../entities/activity-type/models/activity-types.types";

@Component({
    selector: "app-activity-log-entry",
    templateUrl: "./activity-log-entry.component.html",
    providers: [AccordionComponent],
})
export class ActivityLogEntryComponent {
    private colors = activityColors;

    public _group!: IGroupEntry;
    @Input()
    public set group(value: IGroupEntry) {
        this._group = value;
        this.updateCustomClass();
    }
    public get group(): IGroupEntry {
        return this._group;
    }

    private _activityTypes!: IActivityTypes;
    @Input()
    public set activityTypes(value: IActivityTypes | undefined) {
        if (!value) {
            return;
        }
        this._activityTypes = value;
        this.updateCustomClass();
    }
    public get activityTypes(): IActivityTypes {
        return this._activityTypes;
    }

    public customColorClass = "";

    public confirmDelete?: string;

    constructor(public store: Store<ApplicationState>) {}

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
            console.log(
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
                this.customColorClass = color!.styleClass;
            } else {
                this.customColorClass = "";
            }
        }
    }
}
