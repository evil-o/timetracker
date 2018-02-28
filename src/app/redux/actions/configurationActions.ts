import { Action } from '@ngrx/store';

export const SET_WEEKLY_WORK_HOURS = 'SET_WEEKLY_WORK_HOURS';
export const SET_WEEKLY_WORK_DAYS = 'SET_WEEKLY_WORK_DAYS';

export class SetWeeklyWorkHoursAction implements Action {
  public readonly type = SET_WEEKLY_WORK_HOURS;

  constructor(public newWeeklyHours: number) { }
}
export class SetWeeklyWorkDaysAction implements Action {
  public readonly type = SET_WEEKLY_WORK_DAYS;

  constructor(public newWeeklyWorkDays: number) { }
}

export type ConfigurationAction =
  | SetWeeklyWorkHoursAction
  | SetWeeklyWorkDaysAction
  ;
