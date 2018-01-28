import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { IActivityLogEntry } from '../../redux/states/activityLog';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { IActivityTypes, ActivityTypes } from '../../redux/states/activityTypes';
import { IActivityType } from '../../models/interfaces';

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

  private _groups: IGroupEntry[];

  @Input()
  public groups$: Observable<IGroupEntry[]>;

  public sortedGroups$: Observable<IGroupEntry[]>;

  @Input() public activityTypes$: Observable<IActivityTypes>;

  constructor() { }

  ngOnInit() {
    this.sortedGroups$ = Observable.combineLatest(this.groups$, this.activityTypes$)
      .map(([groups, activityTypes]) => {
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
      });
  }
}
