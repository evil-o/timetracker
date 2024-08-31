import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { provideMockStore } from "@ngrx/store/testing";
import { Subject } from "rxjs";
import {
    ActivityLog,
    IActivityLogStateSlice,
} from "../../../../entities/activity-log";
import {
    ActivityTypes,
    IActivityTypesStateSlice,
} from "../../../../entities/activity-type";
import {
    AttendanceState,
    IAttendanceStateSlice,
} from "../../../../entities/attendance";
import {
    ConfigurationState,
    IConfigurationStateSlice,
} from "../../../../entities/configuration";
import { DayAttendanceComponent } from "./day-attendance.component";

type StateSlice = IAttendanceStateSlice &
    IActivityLogStateSlice &
    IActivityTypesStateSlice &
    IConfigurationStateSlice;

describe(DayAttendanceComponent.name, () => {
    const create = createComponentFactory({
        component: DayAttendanceComponent,
        shallow: true,
        providers: [
            provideMockStore<StateSlice>({
                initialState: {
                    activityLog: new ActivityLog(),
                    activityTypes: new ActivityTypes(),
                    attendanceState: new AttendanceState(),
                    configuration: new ConfigurationState(),
                },
            }),
        ],
    });
    let spectator: Spectator<DayAttendanceComponent>;

    beforeEach(() => {
        spectator = create({ props: { date$: new Subject<Date>() } });
    });

    it("should create", () => {
        expect(spectator.component).toBeTruthy();
    });
});
