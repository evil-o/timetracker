import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { IGroupEntry } from '../../pipes/group-activity-log-entries-by-id.pipe';
import { IActivityTypes } from '../../redux/states/activityTypes';
import { AccordionComponent } from 'ngx-bootstrap';

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

  @Output()
  public changeEntryDescription = new EventEmitter<{entryId: string, newDescription: string}>();

  constructor() { }

  ngOnInit() {
  }
}
