import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IActivityType } from '../models/interfaces';
import { Observable } from 'rxjs/Observable';
import { ApplicationState } from '../redux/states/applicationState';
import { Store } from '@ngrx/store';
import { ExportStorageAction } from '../redux/actions/storageVersionActions';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public entries = [
    { label: 'Today', link: 'today', icon: 'calendar' },
    { label: 'Week', link: 'week', icon: 'calendar-alt' },
  ];

  @Input()
  public activities$: Observable<IActivityType[]>;

  @Output()
  public createActivityEvent = new EventEmitter<string>();

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {
  }

  public createActivity(name: string) {
    this.createActivityEvent.emit(name);
  }

  downloadStorage() {
    const dlAnchorElem = document.getElementById('downloadElement');
    this.store.dispatch(new ExportStorageAction(dlAnchorElem));
  }

}
