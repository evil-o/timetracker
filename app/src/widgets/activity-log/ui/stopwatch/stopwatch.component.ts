import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, Observable, Subject, timer, withLatestFrom } from "rxjs";
import {
    activityTypeActions,
    fromActivityTypes,
    IActivityType,
} from "../../../../entities/activity-type";
import { ApplicationState } from "../../../../entities/application";
import {
    fromStopWatch,
    stopWatchActions,
} from "../../../../entities/stop-watch";

@Component({
    selector: "app-stopwatch",
    templateUrl: "./stopwatch.component.html",
    standalone: false,
})
export class StopwatchComponent {
    public static readonly UPDATE_INTERVAL_MS = 1000;

    public isRunning$: Observable<boolean>;

    public isStarted$: Observable<boolean>;

    public isPaused$: Observable<boolean>;

    public activities$: Observable<IActivityType[]>;

    public timeElapsedHours$: Observable<number | undefined>;

    public logClick$ = new Subject<string>();

    public constructor(private store: Store<ApplicationState>) {
        const state$ = this.store.select(fromStopWatch.getState);
        this.isStarted$ = state$.pipe(map((v) => v.startedAt !== undefined));
        this.isRunning$ = state$.pipe(
            map((v) => v.startedAt !== undefined && !v.isPaused)
        );
        this.isPaused$ = state$.pipe(map((v) => v.isPaused));

        const msToH = 60 * 60 * 1000;
        this.timeElapsedHours$ = timer(
            0,
            StopwatchComponent.UPDATE_INTERVAL_MS
        ).pipe(
            withLatestFrom(state$),
            map(([_, state]) => {
                if (state.isPaused) {
                    return state.additionalTimeInMs / msToH;
                } else {
                    if (state.startedAt === undefined) {
                        return undefined;
                    }

                    const milliseconds =
                        Date.now() -
                        state.startedAt.getTime() +
                        state.additionalTimeInMs;
                    return milliseconds / msToH;
                }
            })
        );

        this.activities$ = this.store
            .select(fromActivityTypes.getState)
            .pipe(map((v) => v.activities));

        this.logClick$
            .pipe(withLatestFrom(this.timeElapsedHours$))
            .subscribe(([activity, hours]) => {
                if (
                    !activity ||
                    typeof activity !== "string" ||
                    activity === "" ||
                    hours === undefined
                ) {
                    return;
                }
                this.store.dispatch(
                    activityTypeActions.createAndLogTime({
                        name: activity,
                        hours,
                        date: new Date(),
                        description: "Timed with stop watch",
                        createIfExists: false,
                    })
                );
                this.store.dispatch(stopWatchActions.reset());
            });
    }

    public start() {
        this.store.dispatch(stopWatchActions.start({ startTime: new Date() }));
    }

    public pause() {
        this.store.dispatch(stopWatchActions.pause({ pauseTime: new Date() }));
    }

    public reset() {
        this.store.dispatch(stopWatchActions.reset());
    }

    public logNow(activityName: string) {
        this.logClick$.next(activityName);
    }
}
