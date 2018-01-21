import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IActivityType } from '../models/interfaces';
import { Observable } from 'rxjs/Observable';

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

  constructor() { }

  ngOnInit() {
  }

  public createActivity(name: string) {
    this.createActivityEvent.emit(name);
  }

}
