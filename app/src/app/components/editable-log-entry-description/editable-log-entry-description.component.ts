import { Component, EventEmitter, ElementRef, Input, Output, OnInit, ViewChild } from '@angular/core';
import { ActivityLogEntry } from '../../redux/states/activityLog';

@Component({
  selector: 'app-editable-log-entry-description',
  templateUrl: './editable-log-entry-description.component.html',
  styleUrls: ['./editable-log-entry-description.component.css']
})
export class EditableLogEntryDescriptionComponent implements OnInit {

  @Input()
  public entry!: ActivityLogEntry;

  @Output()
  public changeEntryDescription = new EventEmitter<{entryId: string, newDescription: string}>();

  @ViewChild('descriptionInput')
  public descriptionInput!: ElementRef;

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

  public emitChangeDescription(newDescription: string) {
    this.changeEntryDescription.emit({
      entryId: this.entry.id,
      newDescription: newDescription,
    });
  }
}
