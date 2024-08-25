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
import { GroupActivityLogEntriesByIdPipe } from "../../entities/activity-log/lib/group-activity-log-entries-by-id.pipe";
import { activityLogActions } from "../../entities/activity-log/models/activity-log.actions";
import { ActivityLogEntry } from "../../entities/activity-log/models/activity-log.state";
import { EditableLogEntryDescriptionComponent } from "../../entities/activity-log/ui/editable-log-entry-description/editable-log-entry-description.component";
import { EditableLogEntryHoursComponent } from "../../entities/activity-log/ui/editable-log-entry-hours/editable-log-entry-hours.component";
import { NoActivityLogEntryPresentComponent } from "../../entities/activity-log/ui/no-activity-log-entry-present/no-activity-log-entry-present.component";
import { ActivityTypeEntitiesModule } from "../../entities/activity-type/activity-type-entities.module";
import { ActivityTypeIdToNamePipe } from "../../entities/activity-type/lib/activity-type-id-to-name.pipe";
import { ApplicationState } from "../../entities/application/models/application.model";
import { AcivityColorFeaturesModule } from "../../features/activity-color/activity-color-features.module";
import { ActivityLogEntryComponent } from "../../features/activity-log/ui/activity-log-entry/activity-log-entry.component";
import { FormatHoursPipe } from "../../shared";
import { DayAttendanceComponent } from "../../shared/legacy/day-attendance/day-attendance.component";
import { HourBadgeComponent } from "../../shared/ui/hour-badge/hour-badge.component";
import { TimeBadgeComponent } from "../../shared/ui/time-badge/time-badge.component";
import { ActivityLogListComponent } from "../../widgets/activity-log/ui/activity-log-list/actvity-log-list.component";
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
                ActivityTypeEntitiesModule,
                AcivityColorFeaturesModule,
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
