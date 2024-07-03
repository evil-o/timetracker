import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IActivityType } from '../../models/interfaces';
import { ApplicationState } from '../../redux/states/applicationState';
import { Store } from '@ngrx/store';
import { SetActivityTypeIsNonWorkingAction, SetActivityTypeColorIdAction, SetArchivedAction } from '../../redux/actions/activityTypesActions';

@Component({
  selector: 'app-activity-type-list',
  templateUrl: './activity-type-list.component.html',
  styleUrls: ['./activity-type-list.component.css']
})
export class ActivityTypeListComponent implements OnInit {

  @Output() public mergeRequest = new EventEmitter<IActivityType>();

  _types?: IActivityType[];
  @Input() set types(value: IActivityType[] | undefined | null) {
    this._types = value ?? undefined;
    this.sortedTypes = this._types?.sort((a, b) => a.name.localeCompare(b.name));
  }
  get types(): IActivityType[] | undefined {
    return this._types;
  }

  sortedTypes?: IActivityType[];

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {
  }

  setArchived(id: string, value: boolean) {
    this.store.dispatch(new SetArchivedAction(id, value));
  }

  setNonWorking(id: string, value: boolean) {
    this.store.dispatch(new SetActivityTypeIsNonWorkingAction(id, value));
  }

  setColor(activityId: string, colorId?: string) {
    this.store.dispatch(new SetActivityTypeColorIdAction(activityId, colorId));
  }
}
