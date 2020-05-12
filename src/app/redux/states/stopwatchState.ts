export interface IStopWatch {
  startedAt: Date | undefined;
  isPaused: boolean;
  additionalTimeInMs: number;
}

export class StopWatch implements IStopWatch {
  public startedAt: Date | undefined;

  public isPaused = false;

  public additionalTimeInMs = 0;
}
