import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { Subject } from 'rxjs';
import { DayAttendanceComponent } from './day-attendance.component';

describe('DayAttendanceComponent', () => {
  let component: DayAttendanceComponent;
  let fixture: ComponentFixture<DayAttendanceComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [
        DayAttendanceComponent,
      ],
      imports: [
        AccordionModule.forRoot(),
        StoreModule.forRoot(),
      ],
      providers: [provideNoopAnimations()]
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
