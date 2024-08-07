import { createReducer, on } from "@ngrx/store";
import { producerOn } from "../../utils/ngrx";
import { stopWatchActions } from "../actions/stop-watch.actions";
import { StopWatch } from "../states/stopwatchState";

export const stopWatchReducer = createReducer(
    new StopWatch(),

    on(stopWatchActions.start, (state, { startTime }) => {
        return producerOn(state, (draft) => {
            draft.isPaused = false;
            draft.startedAt = startTime;
        });
    }),

    on(stopWatchActions.pause, (state, { pauseTime }) => {
        return producerOn(state, (draft) => {
            let additionalTimeInMs = draft.additionalTimeInMs;
            if (draft.startedAt) {
                additionalTimeInMs += pauseTime.getTime() - draft.startedAt.getTime();
            }
            draft.isPaused = true;
            draft.startedAt = undefined;
            draft.additionalTimeInMs = additionalTimeInMs;
        });
    }),

    on(stopWatchActions.reset, (state) => {
        return producerOn(state, (draft) => {
            draft.isPaused = false;
            draft.startedAt = undefined;
            draft.additionalTimeInMs = 0;
        });
    }),
);