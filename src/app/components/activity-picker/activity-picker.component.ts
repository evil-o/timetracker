import { Component, EventEmitter, ElementRef, Input, Output, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
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
export class ActivityPickerComponent implements OnInit, OnDestroy {
  model: any;

  @Input()
  public activities$: Observable<IActivityType[]>;

  @Input()
  public placeholder = 'What are you doing?';

  @Output()
  public confirm = new EventEmitter<void>();

  @ViewChild('textInput')
  public textInput: ElementRef;

  @ViewChild(TypeaheadDirective)
  public typeahead: TypeaheadDirective;

  public activityNames: string[];

  public name = '';

  private subscription: Subscription;

  ngOnInit() {
    this.subscription = this.activities$.subscribe((value) => this.activityNames = value.map(v => v.name));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  focus() {
    this.textInput.nativeElement.focus();
  }

  emitConfirm() {
    if (!this.typeahead.typeahead) {
      this.confirm.emit();
    }
  }
}
