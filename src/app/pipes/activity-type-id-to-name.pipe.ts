import { Pipe, PipeTransform } from '@angular/core';
import { IActivityTypes, ActivityTypes } from '../redux/states/activityTypes';

@Pipe({
  name: 'activityTypeIdToName'
})
export class ActivityTypeIdToNamePipe implements PipeTransform {

  transform(activityId: string, activityTypes: IActivityTypes): string {
    return ActivityTypes.byId(activityTypes, activityId).name;
  }

}
