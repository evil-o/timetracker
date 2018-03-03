import { Component, ElementRef, EventEmitter, Input, Output, OnInit, ViewChild } from '@angular/core';
import { ActivityLogEntry } from '../../redux/states/activityLog';
import { stringToDuration } from '../../helpers';

@Component({
  selector: 'app-editable-log-entry-hours',
  templateUrl: './editable-log-entry-hours.component.html',
  styleUrls: ['./editable-log-entry-hours.component.css']
})
export class EditableLogEntryHoursComponent implements OnInit {

  @Input()
  public entry: ActivityLogEntry;

  @Output()
  public changeEntryHours = new EventEmitter<{ entryId: string, newHours: number }>();

  @ViewChild('hoursInput')
  public descriptionInput: ElementRef;

  public editing = false;

  constructor() { }

  ngOnInit() {
  }

  public setEditing(editing: boolean) {
    this.editing = editing;

    if (this.editing) {
      setTimeout(() => this.descriptionInput.nativeElement.focus(), 0);
    }
  }

  public emitChangeHours(newHoursStr: string) {
    const hoursNumber = stringToDuration(newHoursStr);

    if (hoursNumber) {
      this.changeEntryHours.emit({
        entryId: this.entry.id,
        newHours: hoursNumber,
      });
    }
  }
}
