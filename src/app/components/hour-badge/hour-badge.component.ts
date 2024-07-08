import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hour-badge',
  templateUrl: './hour-badge.component.html'
})
export class HourBadgeComponent {
  @Input() hours: number | undefined | null;
}
