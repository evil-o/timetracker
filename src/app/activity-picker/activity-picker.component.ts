import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { IActivityType } from '../models/interfaces';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-activity-picker',
  templateUrl: './activity-picker.component.html',
  styleUrls: ['./activity-picker.component.css']
})
export class ActivityPickerComponent implements OnInit, OnDestroy {
  model: any;

  @Input()
  public activities$: Observable<IActivityType[]>;

  public activityNames: string[];

  private subscription: Subscription;


  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.focus$)
      .merge(this.click$.filter(() => !this.instance.isPopupOpen()))
      .map(term =>
        (term === ''
          ? this.activityNames
          : this.activityNames.filter(x => x.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
      )

  ngOnInit() {
    this.subscription = this.activities$.subscribe((value) => this.activityNames = value.map(v => v.name));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
