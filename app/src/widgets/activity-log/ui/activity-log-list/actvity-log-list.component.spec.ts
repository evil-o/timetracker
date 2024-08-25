import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AccordionModule } from "ngx-bootstrap/accordion";
import { of } from "rxjs";
import { EditableLogEntryDescriptionComponent } from "../../../../entities/activity-log/ui/editable-log-entry-description/editable-log-entry-description.component";
import { EditableLogEntryHoursComponent } from "../../../../entities/activity-log/ui/editable-log-entry-hours/editable-log-entry-hours.component";
import { ActivityTypeIdToNamePipe } from "../../../../entities/activity-type/lib/activity-type-id-to-name.pipe";
import { ActivityLogEntryComponent } from "../../../../features/activity-log/ui/activity-log-entry/activity-log-entry.component";
import { FormatHoursPipe } from "../../../../shared";
import { NoActivityLogEntryPresentComponent } from "../../../../shared/legacy/no-activity-log-entry-present/no-activity-log-entry-present.component";
import { HourBadgeComponent } from "../../../../shared/ui/hour-badge/hour-badge.component";
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
