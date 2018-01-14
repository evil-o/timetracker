import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IActivityLogEntry } from '../../redux/states/activityLog';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { IActivityTypes, ActivityTypes } from '../../redux/states/activityTypes';

interface IGroupEntry {
  id: string;
  cumulativeHours: number;
  entries: IActivityLogEntry[];
}

@Component({
  selector: 'app-actvity-log-list',
  templateUrl: './actvity-log-list.component.html',
  styleUrls: ['./actvity-log-list.component.css']
})
export class ActvityLogListComponent implements OnInit, OnDestroy {

  public ActivityTypes = ActivityTypes;

  @Input()
  public entries$: Observable<IActivityLogEntry[]>;

  @Input()
  public activityTypes: IActivityTypes;

  public groups$ = new Subject<IGroupEntry[]>();

  private subscriptions: Subscription[] = [];

  constructor() { }

  ngOnInit() {
    this.subscriptions.push(this.entries$.subscribe((entries) => {
      const grouped = this.groupEntries(entries);
      this.groups$.next(grouped);
    }));
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  private groupEntries(currentEntries): IGroupEntry[] {
    const grouped: IGroupEntry[] = [];

    for (const entry of currentEntries) {
      const id = entry.actvitiyId;
      const group = grouped.find((e) => e.id === id);
      if (group) {
        group.cumulativeHours += entry.hours;
        group.entries.push(entry);
      } else {
        grouped.push({id, entries: [entry], cumulativeHours: entry.hours});
      }
    }

    return grouped;
  }
}
