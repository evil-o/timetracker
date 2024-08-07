import { ConfigurationAction, SET_WEEKLY_WORK_DAYS, SET_WEEKLY_WORK_HOURS } from '../actions/configurationActions.legacy';
import { ConfigurationState, IConfigurationState } from '../states/configuration';


export function configurationReducer(
  state: IConfigurationState = new ConfigurationState(), action: ConfigurationAction
): IConfigurationState {
  switch (action.type) {
    case SET_WEEKLY_WORK_HOURS: {
      return { ...state, workingHoursPerWeek: Number(action.newWeeklyHours) };
    }

    case SET_WEEKLY_WORK_DAYS: {
      return { ...state, workingDaysPerWeek: Number(action.newWeeklyWorkDays) };
    }

    default:
      return state;
  }
}
