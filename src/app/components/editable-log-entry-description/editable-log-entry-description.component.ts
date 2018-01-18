import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivityLogEntry } from '../../redux/states/activityLog';

@Component({
  selector: 'app-editable-log-entry-description',
  templateUrl: './editable-log-entry-description.component.html',
  styleUrls: ['./editable-log-entry-description.component.css']
})
export class EditableLogEntryDescriptionComponent implements OnInit {

  @Input()
  public entry: ActivityLogEntry;

  @ViewChild('descriptionInput')
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
}
