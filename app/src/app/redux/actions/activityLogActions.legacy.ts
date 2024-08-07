import { Action } from '@ngrx/store';
import { IActivityLog } from '../states/activityLog';

export const LOG_TIME = 'LOG_TIME';
export const SET_DESCRIPTION = 'SET_DESCRIPTION';
export const SET_HOURS = 'SET_HOURS';
export const DELETE_ENTRY = 'DELETE_ENTRY';
export const MERGE_ACTIVITIES = 'MERGE_ENTRIES';
export const IMPORT_ACTIVITIES = 'IMPORT_ACTIVITIES';


export class LogTimeAction implements Action {
  public readonly type = LOG_TIME;

  constructor(public id: string, public hoursToLog: number, public date: Date, public description?: string) { }
}

export class SetDescriptionAction implements Action {
  public readonly type = SET_DESCRIPTION;

  constructor(public entryId: string, public description: string) { }
}

export class SetHoursAction implements Action {
  public readonly type = SET_HOURS;

  constructor(public entryId: string, public hours: number) { }
}

export class DeleteEntryAction implements Action {
  public readonly type = DELETE_ENTRY;

  constructor(public entryId: string) { }
}

export class MergeActivitiesAction implements Action {
  public readonly type = MERGE_ACTIVITIES;

  constructor(public sourceActvityId: string, public targetActivityId: string) { }
}

export class ImportActivitiesAction implements Action {
  public readonly type = IMPORT_ACTIVITIES;

  constructor(public data: Partial<IActivityLog>) { }
}

export type ActivityLogAction =
  | LogTimeAction
  | SetDescriptionAction
  | SetHoursAction
  | DeleteEntryAction
  | MergeActivitiesAction
  | ImportActivitiesAction
  ;
