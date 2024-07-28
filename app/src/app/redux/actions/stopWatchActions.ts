import { Action } from '@ngrx/store';

export const START_STOP_WATCH = 'START_STOP_WATCH';
export class StartStopWatchAction implements Action {
  public readonly type = START_STOP_WATCH;

  constructor(public startTime: Date) { }
}

export const PAUSE_STOP_WATCH = 'PAUSE_STOP_WATCH';
export class PauseStopWatchAction implements Action {
  public readonly type = PAUSE_STOP_WATCH;

  constructor(public pauseTime: Date) { }
}

export const RESET_STOP_WATCH = 'RESET_STOP_WATCH';
export class ResetStopWatchAction implements Action {
  public readonly type = RESET_STOP_WATCH;

  constructor() { }
}

export type StopWatchAction =
  | StartStopWatchAction
  | PauseStopWatchAction
  | ResetStopWatchAction
  ;
