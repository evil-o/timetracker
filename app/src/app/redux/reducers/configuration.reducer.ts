import { createReducer } from "@ngrx/store";
import { produceOn } from "../../utils/ngrx";
import { configurationActions } from "../actions/configuration.actions";
import { ConfigurationState } from "../states/configuration";

export const configurationReducer = createReducer(
    new ConfigurationState(),

    produceOn(
        configurationActions.setWeeklyWorkDays,
        (draft, { newWeeklyWorkDays }) => {
            draft.workingDaysPerWeek = newWeeklyWorkDays;
        }
    ),

    produceOn(
        configurationActions.setWeeklyWorkHours,
        (draft, { newWeeklyHours }) => {
            draft.workingHoursPerWeek = newWeeklyHours;
        }
    )
);
