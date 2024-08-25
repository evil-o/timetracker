import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AccordionModule } from "ngx-bootstrap/accordion";
import { of } from "rxjs";
import { ActivityLogEntryComponent } from "../../../../shared/legacy/activity-log-entry/activity-log-entry.component";
import { EditableLogEntryDescriptionComponent } from "../../../../shared/legacy/editable-log-entry-description/editable-log-entry-description.component";
import { EditableLogEntryHoursComponent } from "../../../../shared/legacy/editable-log-entry-hours/editable-log-entry-hours.component";
import { HourBadgeComponent } from "../../../../shared/legacy/hour-badge/hour-badge.component";
import { NoActivityLogEntryPresentComponent } from "../../../../shared/legacy/no-activity-log-entry-present/no-activity-log-entry-present.component";
import { ActivityTypeIdToNamePipe } from "../../../../shared/legacy/pipes/activity-type-id-to-name.pipe";
import { FormatHoursPipe } from "../../../../shared/legacy/pipes/format-hours.pipe";
import { ActivityLogListComponent } from "./actvity-log-list.component";

describe(ActivityLogListComponent.name, () => {
    let component: ActivityLogListComponent;
    let fixture: ComponentFixture<ActivityLogListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ActivityLogEntryComponent,
                ActivityLogListComponent,
                ActivityTypeIdToNamePipe,
                FormatHoursPipe,
                HourBadgeComponent,
                EditableLogEntryDescriptionComponent,
                EditableLogEntryHoursComponent,
                NoActivityLogEntryPresentComponent,
            ],
            imports: [AccordionModule.forRoot()],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ActivityLogListComponent);
        component = fixture.componentInstance;
        component.activityTypes$ = of({ activities: [] });
        component.groups$ = of([]);
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
