import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayAttendanceComponent } from './day-attendance.component';

describe('DayAttendanceComponent', () => {
  let component: DayAttendanceComponent;
  let fixture: ComponentFixture<DayAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
