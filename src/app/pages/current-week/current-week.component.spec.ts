import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentWeekComponent } from './current-week.component';

describe('CurrentWeekComponent', () => {
  let component: CurrentWeekComponent;
  let fixture: ComponentFixture<CurrentWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
