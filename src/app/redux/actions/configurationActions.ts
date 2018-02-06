import { Action } from '@ngrx/store';

export const SET_WEEKLY_WORK_HOURS = 'SET_WEEKLY_WORK_HOURS';

export class SetWeeklyWorkHoursAction implements Action {
  public readonly type = SET_WEEKLY_WORK_HOURS;

  constructor(public newWeeklyHours: number) { }
}

export type ConfigurationAction =
  | SetWeeklyWorkHoursAction
  ;
