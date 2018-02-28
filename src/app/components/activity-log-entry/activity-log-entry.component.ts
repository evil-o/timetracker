import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { IGroupEntry } from '../../pipes/group-activity-log-entries-by-id.pipe';
import { IActivityTypes } from '../../redux/states/activityTypes';
import { AccordionComponent } from 'ngx-bootstrap';
import { ApplicationState } from '../../redux/states/applicationState';
import { activityColors } from '../../models/activityColors';

import { Store } from '@ngrx/store';
import { SetDescriptionAction, SetHoursAction, DeleteEntryAction } from '../../redux/actions/activityLogActions';

@Component({
  selector: 'app-activity-log-entry',
  templateUrl: './activity-log-entry.component.html',
  styleUrls: ['./activity-log-entry.component.css'],
  providers: [AccordionComponent],
})
export class ActivityLogEntryComponent implements OnInit {
  private colors = activityColors;

  public _group: IGroupEntry;
  @Input()
  public set group(value: IGroupEntry) {
    this._group = value;
    this.updateCustomClass();
  }
  public get group(): IGroupEntry {
    return this._group;
  }

  private _activityTypes: IActivityTypes;
  @Input()
  public set activityTypes(value: IActivityTypes) {
    this._activityTypes = value;
    this.updateCustomClass();
  }
  public get activityTypes(): IActivityTypes {
    return this._activityTypes;
  }

  public customColorClass = '';

  public confirmDelete?: string;

  constructor(public store: Store<ApplicationState>) { }

  public changeEntryDescription(params: { entryId: string, newDescription: string }) {
    this.store.dispatch(new SetDescriptionAction(params.entryId, params.newDescription));
  }

  public changeEntryHours(params: { entryId: string, newHours: number }) {
    this.store.dispatch(new SetHoursAction(params.entryId, params.newHours));
  }

  ngOnInit() {
  }

  public deleteEntry(id: string) {
    if (this.confirmDelete === id) {
      this.confirmDelete = undefined;
      this.store.dispatch(new DeleteEntryAction(id));
    } else {
      console.log(`Did not delete entry ${id} because it was not confirmed.`);
    }
  }

  private updateCustomClass() {
    if (this.group && this.activityTypes) {
      const type = this.activityTypes.activities.find(t => t.id === this.group.activityId);
      if (type && type.colorId) {
        const color = this.colors.find(c => c.id === type.colorId);
        this.customColorClass = color.styleClass;
      } else {
        this.customColorClass = '';
      }
    }
  }
}
