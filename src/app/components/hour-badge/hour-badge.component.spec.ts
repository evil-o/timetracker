import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourBadgeComponent } from './hour-badge.component';

describe('HourBadgeComponent', () => {
  let component: HourBadgeComponent;
  let fixture: ComponentFixture<HourBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
