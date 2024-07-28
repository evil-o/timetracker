import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceComponent } from './attendance.component';
import { BsDatepickerModule, AccordionModule } from 'ngx-bootstrap';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../redux/reducers';
import { DayAttendanceComponent } from '../../components/day-attendance/day-attendance.component';

describe('AttendanceComponent', () => {
  let component: AttendanceComponent;
  let fixture: ComponentFixture<AttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AttendanceComponent,
        DayAttendanceComponent,
      ],
      imports: [
        AccordionModule.forRoot(),
        BsDatepickerModule.forRoot(),
        StoreModule.forRoot(reducers),
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
