import { Component, EventEmitter, ElementRef, Input, Output, ViewChild } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { IActivityType } from '../../models/interfaces';
import { TypeaheadDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-activity-picker',
  templateUrl: './activity-picker.component.html',
  styleUrls: ['./activity-picker.component.css']
})
export class ActivityPickerComponent {
  @Input()
  public set activities(activities: IActivityType[]) {
    this.items = activities.filter(v => !v.isArchived);
  }

  @Input()
  public placeholder = 'What are you doing?';

  @Output()
  public confirm = new EventEmitter<void>();

  @ViewChild('textInput')
  public textInput: ElementRef;

  @ViewChild(TypeaheadDirective)
  public typeahead: TypeaheadDirective;

  public items: IActivityType[] = [];

  public name = '';

  public id = '';

  selected(selection: any) {
    if (selection.item) {
      this.name = selection.item.name;
      this.id = selection.item.id;
    } else {
      this.name = '';
      this.id = '';
    }
    this.confirm.emit();
  }

  focus() {
    this.textInput.nativeElement.focus();
  }
}
