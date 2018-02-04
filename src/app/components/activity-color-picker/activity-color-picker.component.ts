import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IActivityType, IActivityTypeColor } from '../../models/interfaces';
import { activityColors } from '../../models/activityColors';

@Component({
  selector: 'app-activity-color-picker',
  templateUrl: './activity-color-picker.component.html',
  styleUrls: ['./activity-color-picker.component.css']
})
export class ActivityColorPickerComponent implements OnInit {

  public colors: IActivityTypeColor[] = [{ id: undefined, bootstrapClass: undefined }, ...activityColors];

  private _activityType: IActivityType;
  @Input() public set activityType(value: IActivityType) {
    this._activityType = value;
    this.currentColor = value.colorId ? this.colors.find(c => c.id === value.colorId) : undefined;
  }

  public currentColor: IActivityTypeColor;

  @Output() public colorPicked = new EventEmitter<{ colorId?: string }>();

  constructor() { }

  ngOnInit() {
  }

}
