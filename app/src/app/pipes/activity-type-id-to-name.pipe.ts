import { Pipe, PipeTransform } from '@angular/core';
import { IActivityTypes, ActivityTypes } from '../redux/states/activityTypes';

@Pipe({
  name: 'activityTypeIdToName'
})
export class ActivityTypeIdToNamePipe implements PipeTransform {
  public ActivityTypes = ActivityTypes;

  transform(activityId: string, activityTypes: IActivityTypes): string {
    const type = activityTypes.activities.find((activity) => activity.id === activityId);
    if (type) {
      return type.name;
    } else {
      return `Unknown (id: ${activityId})`;
    }
  }

}