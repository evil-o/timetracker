import { Pipe, PipeTransform } from '@angular/core';
import { padNumber } from '../helpers';

@Pipe({
  name: 'formatHours'
})
export class FormatHoursPipe implements PipeTransform {

  transform(totalHours: number, format = '{hh}:{mm}'): any {
    if (totalHours === undefined) {
      return '-';
    }
    const negative = totalHours < 0;
    if (negative) {
      totalHours *= -1;
    }
    const hours = Math.floor(totalHours);
    const totalMinutes = ((totalHours - hours) * 60);
    const minutes = Math.floor(totalMinutes);
    const totalSeconds = ((totalMinutes - minutes) * 60);
    const seconds = Math.floor(totalSeconds);
    let hourPrefix = '';
    if (negative) {
      hourPrefix = '-';
    }
    let formatted = format;
    formatted = formatted.replace('{hh}', hourPrefix + padNumber(hours, 2, '0'));
    formatted = formatted.replace('{h}', hourPrefix + hours.toString());
    formatted = formatted.replace('{m}', padNumber(minutes, 2, '0'));
    formatted = formatted.replace('{s}', padNumber(seconds, 2, '0'));
    return formatted;
  }

}
