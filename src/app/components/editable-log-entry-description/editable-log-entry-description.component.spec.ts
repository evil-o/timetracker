import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableLogEntryDescriptionComponent } from './editable-log-entry-description.component';

describe('EditableLogEntryDescriptionComponent', () => {
  let component: EditableLogEntryDescriptionComponent;
  let fixture: ComponentFixture<EditableLogEntryDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableLogEntryDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableLogEntryDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
