import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-badge',
  templateUrl: './time-badge.component.html',
  styleUrls: ['./time-badge.component.css']
})
export class TimeBadgeComponent implements OnInit {

  @Input() set date(value: Date) {
    this.dateDisplayString = `${value.getHours()}:${this.zeroFill(2, value.getMinutes())}`;
  }

  public dateDisplayString: string;

  constructor() { }

  ngOnInit() {
  }

  zeroFill(numDigits: number, numberToShow: number) {
    const str = '' + numberToShow;
    if (str.length >= numDigits) {
      return str;
    } else {
      return '0'.repeat(numDigits - str.length) + str;
    }
  }
}
