import { Pipe, PipeTransform } from '@angular/core';
import { IActivityLogEntry } from '../redux/states/activityLog';

interface ITallyEntry {
  activityId: string;

  hoursTotal: number;

  entries: IActivityLogEntry[];
}

@Pipe({
  name: 'logEntryTally'
})
export class LogEntryTallyPipe implements PipeTransform {

  transform(entries: IActivityLogEntry[]): ITallyEntry[] {
    const tallies: ITallyEntry[] = [];
    for (const entry of entries) {
      let tally = tallies.find((t) => t.activityId === entry.actvitiyId);
      if (tally) {
        tally.entries.push(entry);
        tally.hoursTotal += entry.hours;
      } else {
        tally = {
          activityId: entry.actvitiyId,
          entries: [entry],
          hoursTotal: entry.hours,
        };
        tallies.push(tally);
      }
    }

    return tallies;
  }

}
