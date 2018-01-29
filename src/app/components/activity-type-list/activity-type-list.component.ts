import { Component, Input, OnInit } from '@angular/core';
import { IActivityType } from '../../models/interfaces';

@Component({
  selector: 'app-activity-type-list',
  templateUrl: './activity-type-list.component.html',
  styleUrls: ['./activity-type-list.component.css']
})
export class ActivityTypeListComponent implements OnInit {

  @Input() types: IActivityType[];

  constructor() { }

  ngOnInit() {
  }

}
