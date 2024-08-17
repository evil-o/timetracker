import { activityLogActions } from "../actions/activity-log.actions";
import { IActivityLog } from "../states/activity-log";
import { activityLogReducer } from "./activity-log.reducer";

describe("the activity log reducer", () => {
    it("should properly merge all entries belonging to an activity id", () => {
        const initialState: IActivityLog = {
            entries: [
                {
                    actvitiyId: "activity1",
                    id: "test1",
                    day: 1,
                    month: 2,
                    year: 2,
                    hours: 1,
                    description: "test",
                },
                {
                    actvitiyId: "activity1",
                    id: "test2",
                    day: 1,
                    month: 2,
                    year: 2,
                    hours: 1,
                    description: "test",
                },
                {
                    actvitiyId: "activity2",
                    id: "test2",
                    day: 1,
                    month: 2,
                    year: 2,
                    hours: 1,
                    description: "test",
                },
            ],
        };

        const src = "activity1";
        const dst = "activity2";
        const next = activityLogReducer(
            initialState,
            activityLogActions.mergeActivities({
                sourceActvityId: src,
                targetActivityId: dst,
            })
        );
        expect(next.entries.length).toBe(3);
        expect(next.entries[0].actvitiyId).toBe(dst);
        expect(next.entries[1].actvitiyId).toBe(dst);
        expect(next.entries[2].actvitiyId).toBe(dst);
    });
});
