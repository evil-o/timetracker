import { createActionGroup, props } from "@ngrx/store";
import { IAttendanceState } from "./attendance.state";

export const attendanceActions = createActionGroup({
    source: "Attendance",
    events: {
        setStartTime: props<{ date: Date; start: Date }>(),
        setEndTime: props<{ date: Date; end: Date }>(),
        setStartAndEndTime: props<{
            date: Date;
            start: Date | undefined;
            end: Date | undefined;
        }>(),
        deleteEntry: props<{ date: Date }>(),
        createCorrection: props<{ year: number; month: number; day: number }>(),
        updateCorrection: props<{
            year: number;
            month: number;
            day: number;
            id: string;
            newHours: number;
            newDescription: string;
        }>(),
        deleteCorrection: props<{
            year: number;
            month: number;
            day: number;
            id: string;
        }>(),
        import: props<{ data: IAttendanceState }>(),
    },
});
