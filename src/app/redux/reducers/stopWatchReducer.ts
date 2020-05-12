import { IStopWatch, StopWatch } from '../states/stopwatchState';
import { StopWatchAction } from '../actions/stopWatchActions';

export function stopWatchReducer(state: IStopWatch = new StopWatch, action: StopWatchAction): IStopWatch {
  switch (action.type) {
    case 'START_STOP_WATCH':
      return { ...state, isPaused: false, startedAt: action.startTime };

    case 'PAUSE_STOP_WATCH':
      let additionalTimeInMs = state.additionalTimeInMs;
      if (state.startedAt) {
        additionalTimeInMs += action.pauseTime.getTime() - state.startedAt.getTime();
      }
      return { ...state, isPaused: true, startedAt: undefined, additionalTimeInMs };

    case 'RESET_STOP_WATCH':
      return { ...state, isPaused: false, startedAt: undefined, additionalTimeInMs: 0 };

    default:
      return state;
  }
}
