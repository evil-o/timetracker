import { createReducer } from "@ngrx/store";
import { produceOn } from "../../../app/utils/ngrx";
import { stopWatchActions } from "./stop-watch.actions";
import { StopWatch } from "./stop-watch.state";

export const stopWatchReducer = createReducer(
    new StopWatch(),

    produceOn(stopWatchActions.start, (draft, { startTime }) => {
        draft.isPaused = false;
        draft.startedAt = startTime;
    }),

    produceOn(stopWatchActions.pause, (draft, { pauseTime }) => {
        let additionalTimeInMs = draft.additionalTimeInMs;
        if (draft.startedAt) {
            additionalTimeInMs +=
                pauseTime.getTime() - draft.startedAt.getTime();
        }
        draft.isPaused = true;
        draft.startedAt = undefined;
        draft.additionalTimeInMs = additionalTimeInMs;
    }),

    produceOn(stopWatchActions.reset, (draft) => {
        draft.isPaused = false;
        draft.startedAt = undefined;
        draft.additionalTimeInMs = 0;
    })
);
