import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayAttendanceComponent } from './day-attendance.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../redux/reducers';
import { Subject } from 'rxjs/Subject';

describe('DayAttendanceComponent', () => {
  let component: DayAttendanceComponent;
  let fixture: ComponentFixture<DayAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DayAttendanceComponent,
      ],
      imports: [
        StoreModule.forRoot(reducers),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayAttendanceComponent);
    component = fixture.componentInstance;
    component.date$ = new Subject<Date>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
