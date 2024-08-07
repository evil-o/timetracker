import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const stopWatchActions = createActionGroup({
    source: "Stop Watch",
    events: {
        start: props<{ startTime: Date }>(),
        pause: props<{ pauseTime: Date }>(),
        reset: emptyProps(),
        fetchOrCreateIdAndLogTime: props<{ name: string, hoursToLog: number, date: Date, description?: string }>()
    }
})