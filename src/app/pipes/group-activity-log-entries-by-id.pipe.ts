import { Pipe, PipeTransform } from '@angular/core';
import { IActivityLogEntry } from '../redux/states/activityLog';
import { Observable } from 'rxjs/Observable';

export interface IGroupEntry {
  activityId: string;
  cumulativeHours: number;
  entries: IActivityLogEntry[];
}

@Pipe({
  name: 'groupActivityLogEntriesById'
})
export class GroupActivityLogEntriesByIdPipe implements PipeTransform {

  transform(entries: IActivityLogEntry[]): IGroupEntry[] {
    const grouped: IGroupEntry[] = [];

    for (const entry of entries) {
      const id = entry.actvitiyId;
      const group = grouped.find((e) => e.activityId === id);
      if (group) {
        group.cumulativeHours += entry.hours;
        group.entries.push(entry);
      } else {
        grouped.push({ activityId: id, entries: [entry], cumulativeHours: entry.hours });
      }
    }

    return grouped;
  }
}
