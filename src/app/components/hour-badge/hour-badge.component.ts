import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hour-badge',
  templateUrl: './hour-badge.component.html',
  styleUrls: ['./hour-badge.component.css']
})
export class HourBadgeComponent implements OnInit {

  @Input() hours: number;

  constructor() { }

  ngOnInit() {
  }

}
