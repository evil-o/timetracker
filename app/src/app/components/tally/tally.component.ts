import { Component, Input } from '@angular/core';
import { IActivityLogEntry } from '../../redux/states/activityLog';
import { IActivityTypes } from '../../redux/states/activityTypes';

@Component({
  selector: 'app-tally',
  templateUrl: './tally.component.html',
  styleUrls: ['./tally.component.css']
})
export class TallyComponent {

  @Input()
  public entries?: IActivityLogEntry[];

  @Input()
  public activityTypes?: IActivityTypes;
}
