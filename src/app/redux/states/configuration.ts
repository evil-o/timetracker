export interface IConfigurationState {
  workingHoursPerWeek: number;
}

export class ConfigurationState implements IConfigurationState {
  public workingHoursPerWeek = 40;
}
