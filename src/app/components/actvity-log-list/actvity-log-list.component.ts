import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
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
export class ActivityLogListComponent implements OnInit {

  public ActivityTypes = ActivityTypes;

  @Input()
  public groups: IGroupEntry[];

  @Input()
  public activityTypes: IActivityTypes;

  constructor() { }

  ngOnInit() { }
}
