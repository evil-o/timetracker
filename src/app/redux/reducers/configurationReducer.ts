import { IConfigurationState, ConfigurationState } from '../states/configuration';
import { ConfigurationAction, SET_WEEKLY_WORK_HOURS, SET_WEEKLY_WORK_DAYS } from '../actions/configurationActions';


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
