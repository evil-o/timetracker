export interface IConfigurationState {
    workingHoursPerWeek: number;
    workingDaysPerWeek: number;
}

export interface IConfigurationStateSlice {
    configuration: IConfigurationState;
}

export class ConfigurationState implements IConfigurationState {
    public workingHoursPerWeek = 40;
    public workingDaysPerWeek = 5;
}
