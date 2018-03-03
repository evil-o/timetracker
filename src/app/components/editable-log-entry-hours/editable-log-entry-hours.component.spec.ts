import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';

import { EditableLogEntryHoursComponent } from './editable-log-entry-hours.component';
import { FormatHoursPipe } from '../../pipes/format-hours.pipe';

@Component({
  selector: `app-test-host-component`,
  template: `<app-editable-log-entry-hours></app-editable-log-entry-hours>`
})
class TestHostComponent {
  @ViewChild(EditableLogEntryHoursComponent)
  public component: EditableLogEntryHoursComponent;
}

describe('EditableLogEntryHoursComponent', () => {
  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditableLogEntryHoursComponent,
        FormatHoursPipe,
        TestHostComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    host.component.entry = {
      actvitiyId: 'testActivity',
      day: 13,
      month: 0,
      year: 2018,
      description: 'test description',
      hours: 6,
      id: 'testId',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(host).toBeTruthy();
  });
});
