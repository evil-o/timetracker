import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { of } from "rxjs";
import {
    EditableLogEntryDescriptionComponent,
    EditableLogEntryHoursComponent,
    NoActivityLogEntryPresentComponent,
} from "../../../../entities/activity-log";
import { ActivityTypeIdToNamePipe } from "../../../../entities/activity-type";
import { ActivityLogEntryComponent } from "../../../../features/activity-log";
import { FormatHoursPipe } from "../../../../shared/lib";
import { HourBadgeComponent } from "../../../../shared/ui";
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
