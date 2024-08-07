import { createActionGroup, props } from '@ngrx/store';
import { IActivityLog } from '../states/activityLog';

export const activityLogActions = createActionGroup({
  source: "ActivityLog",
  events: {
    logTime: props<{ id: string, hoursToLog: number, date: Date, description?: string }>(),
    setDescription: props<{ entryId: string, description: string }>(),
    setHours: props<{ entryId: string, hours: number }>(),
    deleteEntry: props<{ entryId: string }>(),
    mergeActivities: props<{ sourceActvityId: string, targetActivityId: string }>(),
    importActivities: props<{ data: Partial<IActivityLog> }>(),
  }
})