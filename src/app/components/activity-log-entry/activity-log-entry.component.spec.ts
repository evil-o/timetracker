import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityLogEntryComponent } from './activity-log-entry.component';

describe('ActivityLogEntryComponent', () => {
  let component: ActivityLogEntryComponent;
  let fixture: ComponentFixture<ActivityLogEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityLogEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityLogEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
