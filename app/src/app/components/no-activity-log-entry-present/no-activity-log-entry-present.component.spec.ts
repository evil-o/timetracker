import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { NoActivityLogEntryPresentComponent } from './no-activity-log-entry-present.component';

describe('NoActivityLogEntryPresentComponent', () => {
  let component: NoActivityLogEntryPresentComponent;
  let fixture: ComponentFixture<NoActivityLogEntryPresentComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ NoActivityLogEntryPresentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoActivityLogEntryPresentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
