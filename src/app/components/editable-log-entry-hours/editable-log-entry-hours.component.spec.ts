import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableLogEntryHoursComponent } from './editable-log-entry-hours.component';

describe('EditableLogEntryHoursComponent', () => {
  let component: EditableLogEntryHoursComponent;
  let fixture: ComponentFixture<EditableLogEntryHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableLogEntryHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableLogEntryHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
