import { createReducer } from "@ngrx/store";
import { produceOn } from "../../../shared/lib";
import { configurationActions } from "./configuration.actions";
import { ConfigurationState } from "./configuration.state";

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
