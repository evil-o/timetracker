import { Component, Input, OnInit } from '@angular/core';
import { IActivityType } from '../../models/interfaces';
import { ApplicationState } from '../../redux/states/applicationState';
import { Store } from '@ngrx/store';
import { SetActivityTypeIsNonWorkingAction, SetActivityTypeColorIdAction } from '../../redux/actions/activityTypesActions';

@Component({
  selector: 'app-activity-type-list',
  templateUrl: './activity-type-list.component.html',
  styleUrls: ['./activity-type-list.component.css']
})
export class ActivityTypeListComponent implements OnInit {

  @Input() types: IActivityType[];

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {
  }

  setNonWorking(id: string, value: boolean) {
    this.store.dispatch(new SetActivityTypeIsNonWorkingAction(id, value));
  }

  setColor(activityId: string, colorId?: string) {
    this.store.dispatch(new SetActivityTypeColorIdAction(activityId, colorId));
  }
}
