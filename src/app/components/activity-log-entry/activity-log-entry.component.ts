import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { IGroupEntry } from '../../pipes/group-activity-log-entries-by-id.pipe';
import { IActivityTypes } from '../../redux/states/activityTypes';
import { AccordionComponent } from 'ngx-bootstrap';
import { ApplicationState } from '../../redux/states/applicationState';

import { Store } from '@ngrx/store';
import { SetDescriptionAction, SetHoursAction } from '../../redux/actions/activityLogActions';

@Component({
  selector: 'app-activity-log-entry',
  templateUrl: './activity-log-entry.component.html',
  styleUrls: ['./activity-log-entry.component.css'],
  providers: [AccordionComponent],
})
export class ActivityLogEntryComponent implements OnInit {

  @Input()
  public group: IGroupEntry;

  @Input()
  public activityTypes: IActivityTypes;

  constructor(public store: Store<ApplicationState>) { }

  public changeEntryDescription(params: {entryId: string, newDescription: string}) {
    this.store.dispatch(new SetDescriptionAction(params.entryId, params.newDescription));
  }

  public changeEntryHours(params: {entryId: string, newHours: number}) {
    this.store.dispatch(new SetHoursAction(params.entryId, params.newHours));
  }

  ngOnInit() {
  }
}