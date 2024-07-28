import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FormatHoursPipe } from '../../pipes/format-hours.pipe';
import { EditableLogEntryHoursComponent } from './editable-log-entry-hours.component';

@Component({
  selector: `app-test-host-component`,
  template: `<app-editable-log-entry-hours></app-editable-log-entry-hours>`
})
class TestHostComponent {
  @ViewChild(EditableLogEntryHoursComponent)
  public component!: EditableLogEntryHoursComponent;
}

describe('EditableLogEntryHoursComponent', () => {
  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach((() => {
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

  it('should reject invalid strings', fakeAsync(() => {
    host.component.setEditing(true);
    fixture.detectChanges();

    spyOn(host.component.changeEntryHours, 'emit');
    host.component.emitChangeHours('not a number');
    tick();
    expect(host.component.changeEntryHours.emit).not.toHaveBeenCalled();

    host.component.emitChangeHours('not: a number');
    tick();
    expect(host.component.changeEntryHours.emit).not.toHaveBeenCalled();

    host.component.emitChangeHours('not: 0');
    tick();
    expect(host.component.changeEntryHours.emit).not.toHaveBeenCalled();

    host.component.emitChangeHours('1: not a number either');
    tick();
    expect(host.component.changeEntryHours.emit).not.toHaveBeenCalled();
  }));

  it('should send hours for "," decimal separator', fakeAsync(() => {
    host.component.setEditing(true);
    fixture.detectChanges();

    spyOn(host.component.changeEntryHours, 'emit');
    host.component.changeEntryHours.subscribe(v => {
      expect(v.newHours).toBe(1.25);
    });

    host.component.emitChangeHours('1,25');
    tick();
    expect(host.component.changeEntryHours.emit).toHaveBeenCalled();
  }));

  it('should send hours for "." decimal separator', fakeAsync(() => {
    host.component.setEditing(true);
    fixture.detectChanges();

    spyOn(host.component.changeEntryHours, 'emit');
    host.component.changeEntryHours.subscribe(v => {
      expect(v.newHours).toBe(1.25);
    });

    host.component.emitChangeHours('1.25');
    tick();
    expect(host.component.changeEntryHours.emit).toHaveBeenCalled();
  }));

  it('should send hours for strings starting with "."', fakeAsync(() => {
    host.component.setEditing(true);
    fixture.detectChanges();

    spyOn(host.component.changeEntryHours, 'emit');
    host.component.changeEntryHours.subscribe(v => {
      expect(v.newHours).toBe(0.25);
    });

    host.component.emitChangeHours('.25');
    tick();
    expect(host.component.changeEntryHours.emit).toHaveBeenCalled();
  }));

  it('should support "h:m" input format', fakeAsync(() => {
    host.component.setEditing(true);
    fixture.detectChanges();

    spyOn(host.component.changeEntryHours, 'emit');
    host.component.changeEntryHours.subscribe(v => {
      expect(v.newHours).toBe(0.25);
    });

    host.component.emitChangeHours('0:15');
    tick();
    expect(host.component.changeEntryHours.emit).toHaveBeenCalled();
  }));

  it('should support ":m" input format', fakeAsync(() => {
    host.component.setEditing(true);
    fixture.detectChanges();

    spyOn(host.component.changeEntryHours, 'emit');
    host.component.changeEntryHours.subscribe(v => {
      expect(v.newHours).toBe(0.5);
    });

    host.component.emitChangeHours(':30');
    tick();
    expect(host.component.changeEntryHours.emit).toHaveBeenCalled();
  }));
});
