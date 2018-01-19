import { Pipe, PipeTransform } from '@angular/core';
import { IActivityLogEntry } from '../redux/states/activityLog';
import { IGroupEntry } from './group-activity-log-entries-by-id.pipe';

@Pipe({
  name: 'logEntryTally'
})
export class LogEntryTallyPipe implements PipeTransform {

  transform(entries: IActivityLogEntry[]): IGroupEntry[] {
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

    return tallies;
  }

}
