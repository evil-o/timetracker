import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { IActivityLogEntry } from '../../redux/states/activityLog';
import { IActivityTypes, ActivityTypes } from '../../redux/states/activityTypes';
import { IActivityType } from '../../models/interfaces';
import { combineLatest, map, Observable } from 'rxjs';

interface IGroupEntry {
  activityId: string;
  cumulativeHours: number;
  entries: IActivityLogEntry[];
}

@Component({
  selector: 'app-actvity-log-list',
  templateUrl: './actvity-log-list.component.html',
  styleUrls: ['./actvity-log-list.component.css']
})
export class ActivityLogListComponent implements OnInit {
  @Input()
  public groups$!: Observable<IGroupEntry[]>;

  @Input()
  public activityTypes$!: Observable<IActivityTypes>;

  public sortedGroups$!: Observable<IGroupEntry[]>;

  ngOnInit() {
    this.sortedGroups$ = combineLatest([this.groups$, this.activityTypes$]).pipe(
      map(([groups, activityTypes]) => {
        const copy: IGroupEntry[] = [];
        for (const group of groups) {
          copy.push({
            activityId: group.activityId,
            cumulativeHours: group.cumulativeHours,
            entries: [...group.entries],
          });
        }

        const findName = (array: IActivityType[], id: string) => {
          for (const el of array) {
            if (el.id === id) {
              return el.name;
            }
          }
          return 'Unknown';
        };

        const sorted = copy.sort((a, b) => {
          const typeA = findName(activityTypes.activities, a.activityId);
          const typeB = findName(activityTypes.activities, b.activityId);
          return typeA.localeCompare(typeB);
        });

        return sorted;
      }));
  }
}
