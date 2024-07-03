import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../redux/states/applicationState';
import { StartStopWatchAction, PauseStopWatchAction, ResetStopWatchAction } from '../../redux/actions/stopWatchActions';
import { stopWatchState, activityTypes } from '../../redux/selectors';
import { IActivityType } from '../../models/interfaces';
import { CreateActivityTypeAndLogTimeAction } from '../../redux/actions/activityTypesActions';
import { map, Observable, Subject, timer, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent {
  public static readonly UPDATE_INTERVAL_MS = 1000;

  public isRunning$: Observable<boolean>;
  public isStarted$: Observable<boolean>;
  public isPaused$: Observable<boolean>;

  public activities$: Observable<IActivityType[]>;

  public timeElapsedHours$: Observable<number | undefined>;

  public logClick$ = new Subject<string>();

  constructor(private store: Store<ApplicationState>) {
    const state$ = this.store.select(stopWatchState);
    this.isStarted$ = state$.pipe(map(v => v.startedAt !== undefined));
    this.isRunning$ = state$.pipe(map(v => v.startedAt !== undefined && !v.isPaused));
    this.isPaused$ = state$.pipe(map(v => v.isPaused));

    const msToH = (60 * 60 * 1000);
    this.timeElapsedHours$ = timer(0, StopwatchComponent.UPDATE_INTERVAL_MS).pipe(
      withLatestFrom(state$),
      map(([_, state]) => {
        if (state.isPaused) {
          return state.additionalTimeInMs / msToH;
        } else {
          if (state.startedAt === undefined) {
            return undefined;
          }

          const milliseconds = Date.now() - state.startedAt.getTime() + state.additionalTimeInMs;
          return milliseconds / msToH;
        }
      }));

    this.activities$ = this.store.select(activityTypes).pipe(map(v => v.activities));

    this.logClick$.pipe(withLatestFrom(this.timeElapsedHours$)).subscribe(([activity, hours]) => {
      if (!activity || typeof activity !== 'string' || activity === '' || hours === undefined) {
        return;
      }
      this.store.dispatch(new CreateActivityTypeAndLogTimeAction(activity, hours, new Date(), 'Timed with stop watch', false));
      this.store.dispatch(new ResetStopWatchAction());
    });
  }

  public start() {
    this.store.dispatch(new StartStopWatchAction(new Date()));
  }

  public pause() {
    this.store.dispatch(new PauseStopWatchAction(new Date()));
  }

  public reset() {
    this.store.dispatch(new ResetStopWatchAction());
  }

  public logNow(activityName: string) {
    this.logClick$.next(activityName);
  }
}
