import {
    IActivityType,
    IActivityTypes,
} from "../../../entities/activity-types/activity-types.types";
import { activityLogActions } from "../actions/activity-log.actions";
import { activityTypesReducer } from "./activity-types.reducer";

describe("the activity types reducer", () => {
    it("should remove merged activity types", () => {
        const a1: IActivityType = {
            id: "activity1",
            name: "activity2",
            isNonWorking: false,
            isArchived: false,
        };
        const a2: IActivityType = {
            id: "activity2",
            name: "activity1",
            isNonWorking: true,
            isArchived: false,
        };
        const initialState: IActivityTypes = {
            activities: [a1, a2],
        };

        const src = "activity1";
        const dst = "activity2";
        const next = activityTypesReducer(
            initialState,
            activityLogActions.mergeActivities({
                sourceActvityId: src,
                targetActivityId: dst,
            })
        );
        expect(next.activities.length).toEqual(1);
        expect(next.activities[0]).toEqual(a2);
    });
});
