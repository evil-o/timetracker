import { Pipe, PipeTransform } from '@angular/core';
import { IActivityLogEntry } from '../redux/states/activityLog';
import { IGroupEntry } from './group-activity-log-entries-by-id.pipe';
import { IActivityTypes } from '../redux/states/activityTypes';

@Pipe({
  name: 'logEntryTally'
})
export class LogEntryTallyPipe implements PipeTransform {

  transform(entries: IActivityLogEntry[], types: IActivityTypes): IGroupEntry[] {
    if (!entries) {
      return [];
    }

    const tallies: IGroupEntry[] = [];
    for (const entry of entries) {
      let tally = tallies.find((t) => t.activityId === entry.actvitiyId);
      if (tally) {
        tally.entries.push(entry);
        tally.cumulativeHours += entry.hours;
      } else {
        tally = {
          activityId: entry.actvitiyId,
          entries: [entry],
          cumulativeHours: entry.hours,
        };
        tallies.push(tally);
      }
    }

    const activityNameOf = (entry: IGroupEntry) => {
      const type = types.activities.find(t => t.id === entry.activityId);
      if (type) {
        return type.name;
      } else {
        return 'Unknown';
      }
    };

    return tallies.sort((a, b) => activityNameOf(a).localeCompare(activityNameOf(b)));
  }

}