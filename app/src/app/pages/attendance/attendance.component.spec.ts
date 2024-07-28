import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreModule } from '@ngrx/store';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DayAttendanceComponent } from '../../components/day-attendance/day-attendance.component';
import { AttendanceComponent } from './attendance.component';

describe('AttendanceComponent', () => {
  let component: AttendanceComponent;
  let fixture: ComponentFixture<AttendanceComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [
        AttendanceComponent,
        DayAttendanceComponent,
      ],
      imports: [
        AccordionModule.forRoot(),
        BsDatepickerModule.forRoot(),
        StoreModule.forRoot(),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
