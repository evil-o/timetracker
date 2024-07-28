export interface IConfigurationState {
  workingHoursPerWeek: number;
  workingDaysPerWeek: number;
}

export class ConfigurationState implements IConfigurationState {
  public workingHoursPerWeek = 40;
  public workingDaysPerWeek = 5;
}
