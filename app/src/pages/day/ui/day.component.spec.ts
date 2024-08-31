import { discardPeriodicTasks, fakeAsync, tick } from "@angular/core/testing";
import { byTestId, createComponentFactory, Spectator } from "@ngneat/spectator";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import {
    MockComponents,
    MockDirective,
    MockedComponent,
    MockPipe,
} from "ng-mocks";
import { BsDatepickerDirective } from "ngx-bootstrap/datepicker";
import {
    ActivityLog,
    ActivityLogEntry,
    GroupActivityLogEntriesByIdPipe,
} from "../../../entities/activity-log";
import { createActivityLogEntry } from "../../../entities/activity-log/models/activity-log-entry.faker";
import { ActivityTypes } from "../../../entities/activity-type";
import { ApplicationState } from "../../../entities/application";
import { AttendanceState } from "../../../entities/attendance";
import {
    QuickDayPickerComponent,
    TimeBadgeComponent,
} from "../../../shared/ui";
import { ActivityTypeListComponent } from "../../../widgets/activity-types-list";
import { DayComponent } from "./day.component";

const defaultState = {
    activityTypes: new ActivityTypes(),
    activityLog: new ActivityLog(),
    attendanceState: new AttendanceState(),
};

describe(DayComponent.name, () => {
    const create = createComponentFactory({
        component: DayComponent,
        shallow: true,
        declarations: [
            MockComponents(
                ActivityTypeListComponent,
                QuickDayPickerComponent,
                TimeBadgeComponent
            ),
            MockPipe(GroupActivityLogEntriesByIdPipe),
            MockDirective(BsDatepickerDirective),
        ],
        providers: [
            provideMockStore<Partial<ApplicationState>>({
                initialState: defaultState,
            }),
        ],
    });
    let spectator: Spectator<DayComponent>;
    let component: DayComponent;

    let quickDayPicker: MockedComponent<QuickDayPickerComponent>;

    let store: MockStore<Partial<ApplicationState>>;

    let testEntries: ActivityLogEntry[];

    beforeEach(() => {
        spectator = create();
        component = spectator.component;

        store = spectator.inject(
            Store
        ) as unknown as MockStore<ApplicationState>;

        const now = new Date();
        testEntries = [
            createActivityLogEntry({ date: now }),
            createActivityLogEntry({ date: now }),
        ];

        store.setState({
            ...defaultState,
            activityLog: { entries: testEntries },
        });

        quickDayPicker = spectator.query(
            QuickDayPickerComponent
        ) as MockedComponent<QuickDayPickerComponent>;

        quickDayPicker.datePicked.emit(now);

        spectator.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should properly tally the overall time", fakeAsync(() => {
        tick();

        const sum = testEntries
            .map((e) => e.hours)
            .reduce((prev, cur) => prev + cur, 0);

        const hours = spectator.query(byTestId("total-hours-display"));
        expect(hours).toBeDefined();
        expect(hours).toHaveProperty("hours", sum as unknown as string);

        discardPeriodicTasks();
    }));

    it("should properly display the start time", fakeAsync(() => {
        const n = new Date();

        component.startTime$.subscribe((value) => {
            expect(value.getHours()).toBe(n.getHours() - 6);
            expect(value.getMinutes()).toBe(
                Math.floor(n.getMinutes() + 60 - 15)
            );
        });

        discardPeriodicTasks();
    }));
});
