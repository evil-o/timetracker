import { createActionGroup, props } from '@ngrx/store';

export const configurationActions = createActionGroup({
  source: "Configuration",
  events: {
    setWeeklyWorkHours: props<{ newWeeklyHours: number }>(),
    setWeeklyWorkDays: props<{ newWeeklyWorkDays: number }>(),
  }
})
