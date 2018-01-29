import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-overtime-badge',
  templateUrl: './overtime-badge.component.html',
  styleUrls: ['./overtime-badge.component.css']
})
export class OvertimeBadgeComponent {

  @Input() hours?: number;

  constructor() { }

}
