import { NO_ERRORS_SCHEMA } from "@angular/core";
import {
    ComponentFixture,
    discardPeriodicTasks,
    fakeAsync,
    TestBed,
    tick,
} from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { provideNoopAnimations } from "@angular/platform-browser/animations";
import { Store, StoreModule } from "@ngrx/store";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { activityLogActions } from "../../entities/activity-log/models/activity-log.actions";
import { ActivityLogEntry } from "../../entities/activity-log/models/activity-log.state";
import { ActivityTypesModule } from "../../entities/activity-types/activity-types.module";
import { ApplicationState } from "../../entities/application/models/application.model";
import { FeaturesModule } from "../../features/features.module";
import { ActivityLogEntryComponent } from "../../shared/legacy/activity-log-entry/activity-log-entry.component";
import { ActivityLogListComponent } from "../../shared/legacy/actvity-log-list/actvity-log-list.component";
import { DayAttendanceComponent } from "../../shared/legacy/day-attendance/day-attendance.component";
import { EditableLogEntryDescriptionComponent } from "../../shared/legacy/editable-log-entry-description/editable-log-entry-description.component";
import { EditableLogEntryHoursComponent } from "../../shared/legacy/editable-log-entry-hours/editable-log-entry-hours.component";
import { HourBadgeComponent } from "../../shared/legacy/hour-badge/hour-badge.component";
import { NoActivityLogEntryPresentComponent } from "../../shared/legacy/no-activity-log-entry-present/no-activity-log-entry-present.component";
import { ActivityTypeIdToNamePipe } from "../../shared/legacy/pipes/activity-type-id-to-name.pipe";
import { FormatHoursPipe } from "../../shared/legacy/pipes/format-hours.pipe";
import { GroupActivityLogEntriesByIdPipe } from "../../shared/legacy/pipes/group-activity-log-entries-by-id.pipe";
import { TimeBadgeComponent } from "../../shared/legacy/time-badge/time-badge.component";
import { DayComponent } from "./day.component";

describe("DayComponent", () => {
    let component: DayComponent;
    let fixture: ComponentFixture<DayComponent>;

    const now = new Date();
    const testEntries: ActivityLogEntry[] = [
        {
            actvitiyId: "testActivity",
            day: now.getDate(),
            month: now.getMonth(),
            year: now.getFullYear(),
            description: "test description",
            hours: 6,
            id: "testEntryId1",
        },
        {
            actvitiyId: "testActivity",
            day: now.getDate(),
            month: now.getMonth(),
            year: now.getFullYear(),
            description: "test description",
            hours: 0.25,
            id: "testEntryId2",
        },
    ];

    let store: Store<ApplicationState>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ActivityLogEntryComponent,
                ActivityLogListComponent,
                ActivityTypeIdToNamePipe,
                DayComponent,
                DayAttendanceComponent,
                EditableLogEntryDescriptionComponent,
                EditableLogEntryHoursComponent,
                FormatHoursPipe,
                GroupActivityLogEntriesByIdPipe,
                HourBadgeComponent,
                NoActivityLogEntryPresentComponent,
                TimeBadgeComponent,
            ],
            imports: [
                AccordionModule.forRoot(),
                BsDatepickerModule.forRoot(),
                FormsModule,
                StoreModule.forRoot(),
                TypeaheadModule.forRoot(),
                ActivityTypesModule,
                FeaturesModule,
            ],
            providers: [provideNoopAnimations()],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        store = TestBed.get(Store);
        fixture = TestBed.createComponent(DayComponent);
        component = fixture.componentInstance;

        // populate store
        for (const entry of testEntries) {
            store.dispatch(
                activityLogActions.logTime({
                    id: entry.actvitiyId,
                    hoursToLog: entry.hours,
                    date: new Date(entry.year, entry.month, entry.day),
                })
            );
        }

        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    xit("should properly tally the overall time", fakeAsync(() => {
        expect(component.totalHoursDisplay).toBeDefined();
        expect(component.totalHoursDisplay.hours).toBe(6.25);

        discardPeriodicTasks();
    }));

    xit("should properly display the start time", fakeAsync(() => {
        const n = new Date();

        tick();

        component.startTime$.subscribe((value) => {
            expect(value.getHours()).toBe(n.getHours() - 6);
            expect(value.getMinutes()).toBe(
                Math.floor(n.getMinutes() + 60 - 15)
            );
        });

        discardPeriodicTasks();
    }));
});
