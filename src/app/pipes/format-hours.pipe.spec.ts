import { FormatHoursPipe } from './format-hours.pipe';
import { stringToDuration, padNumber } from '../helpers';

describe('FormatHoursPipe', () => {
  it('should create an instance', () => {
    const pipe = new FormatHoursPipe();
    expect(pipe).toBeTruthy();
  });

  it('should format values correctly', () => {
    const pipe = new FormatHoursPipe();
    const expectations = [
      { h: 2.5, f: '{hh}:{m}', r: '02:30' },
      { h: 12.25, f: '{hh}h {m}m', r: '12h 15m' },
      { h: 0.125, f: '{h}/{m}', r: '0/07' },
      { h: 0.125, f: '{h}|{m}|{s}', r: '0|07|30' },
      { h: 2.5, f: '{h}:{m}', r: '2:30' },
      { h: undefined, f: '{h}:{m}', r: '-' },
      { h: 0, f: '{h}:{m}', r: '0:00' },
      { h: -1.25, f: '{h}:{m}', r: '-1:15' },
      { h: -0.75, f: '{h}:{m}', r: '-0:45' },
    ];

    for (const expectation of expectations) {
      const formatted = pipe.transform(expectation.h, expectation.f);
      expect(formatted).toBe(expectation.r);
    }
  });

  fit('should deal with minute precision correctly', () => {
    const pipe = new FormatHoursPipe();
    for (let hrs = 0; hrs < 24; ++hrs) {
      for (let min = 0; min < 60; ++min) {
        const str = `${hrs}:${padNumber(min, 2, '0')}`;
        const numHrs = stringToDuration(str);
        const formatted = pipe.transform(numHrs, '{h}:{m}');
        expect(formatted).toBe(str, `Failed with ${numHrs} hours`);
      }
    }
  });
});
