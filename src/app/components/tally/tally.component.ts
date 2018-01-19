import { Component, Input, OnInit } from '@angular/core';
import { IActivityLogEntry } from '../../redux/states/activityLog';
import { IActivityTypes } from '../../redux/states/activityTypes';
import { ApplicationState } from '../../redux/states/applicationState';
import { Store } from '@ngrx/store';
import { SetDescriptionAction } from '../../redux/actions/activityLogActions';

@Component({
  selector: 'app-tally',
  templateUrl: './tally.component.html',
  styleUrls: ['./tally.component.css']
})
export class TallyComponent implements OnInit {

  @Input()
  public entries: IActivityLogEntry[];

  @Input()
  public activityTypes: IActivityTypes;

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() { }
}
