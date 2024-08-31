import { NavbarComponent } from "./navbar.component";

import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import {
    ActivityLog,
    IActivityLogStateSlice,
} from "../../../../entities/activity-log";
import {
    ActivityTypes,
    IActivityTypesStateSlice,
} from "../../../../entities/activity-type";
import {
    attendanceActions,
    AttendanceState,
    IAttendanceStateSlice,
} from "../../../../entities/attendance";
import {
    configurationActions,
    ConfigurationState,
    IConfigurationStateSlice,
} from "../../../../entities/configuration";
import { valueToTime } from "../../../../shared/lib";

type StateSlices = IAttendanceStateSlice &
    IActivityLogStateSlice &
    IActivityTypesStateSlice &
    IConfigurationStateSlice;

describe(NavbarComponent.name, () => {
    const create = createComponentFactory({
        component: NavbarComponent,
        shallow: true,
        providers: [
            provideMockStore<StateSlices>({
                initialState: {
                    attendanceState: new AttendanceState(),
                    activityLog: new ActivityLog(),
                    activityTypes: new ActivityTypes(),
                    configuration: new ConfigurationState(),
                },
            }),
        ],
    });
    let spectator: Spectator<NavbarComponent>;
    let component: NavbarComponent;
    let store: MockStore<StateSlices>;

    function setAttendance(start: string, end: string, date: Date) {
        store.dispatch(
            attendanceActions.setStartTime({ date, start: valueToTime(start)! })
        );
        store.dispatch(
            attendanceActions.setEndTime({ date, end: valueToTime(end)! })
        );
    }

    beforeEach(() => {
        spectator = create();
        component = spectator.component;
        store = spectator.inject(Store) as unknown as MockStore<StateSlices>;
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    xit("should correctly display overall overtime for 40h work week", () => {
        store.dispatch(
            configurationActions.setWeeklyWorkHours({ newWeeklyHours: 40 })
        );

        // -4
        setAttendance("8:30", "12:30", new Date(2018, 0, 1));
        // +2
        setAttendance("8:30", "18:30", new Date(2018, 0, 2));
        // +4
        setAttendance("8:30", "20:30", new Date(2018, 0, 3));
        // +3
        setAttendance("8:30", "19:30", new Date(2018, 0, 4));
        // 0
        setAttendance("8:30", "16:30", new Date(2018, 0, 5));

        component.overallAttendanceSum$.subscribe((sum) => {
            expect(sum).toBe(5);
        });
    });

    xit("should correctly display overall overtime for 16h work week", () => {
        store.dispatch(
            configurationActions.setWeeklyWorkHours({ newWeeklyHours: 16 })
        );
        store.dispatch(
            configurationActions.setWeeklyWorkDays({ newWeeklyWorkDays: 2 })
        );

        // -4
        setAttendance("8:30", "12:30", new Date(2018, 0, 1));
        // +2
        setAttendance("8:30", "18:30", new Date(2018, 0, 2));

        component.overallAttendanceSum$.subscribe((sum) => {
            expect(sum).toBe(-2);
        });
    });
});
