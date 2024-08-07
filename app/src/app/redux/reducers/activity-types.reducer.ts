import { createReducer } from "@ngrx/store";
import { produceOn } from "../../utils/ngrx";
import { activityLogActions } from "../actions/activity-log.actions";
import { ActivityTypes } from "../states/activityTypes";

export const activityTypesReducer = createReducer(
  new ActivityTypes(),

  produceOn(activityLogActions.mergeActivities, (draft, { sourceActvityId }) => {
    const idx = draft.activities.findIndex(v => v.id === sourceActvityId);
    if (idx < 0) {
      return;
    }

    draft.activities.splice(idx, 1);
  }),
)