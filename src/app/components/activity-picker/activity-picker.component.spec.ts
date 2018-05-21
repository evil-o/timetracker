import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, discardPeriodicTasks, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TypeaheadModule, TypeaheadDirective } from 'ngx-bootstrap';

import { ActivityPickerComponent } from './activity-picker.component';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { IActivityType } from '../../models/interfaces';
import { By } from '@angular/platform-browser';

@Component({
  selector: `app-test-host-activity-picker-component`,
  template: `<app-activity-picker [activities$]="activities$"></app-activity-picker>`
})
class TestHostActivityPickerComponent {
  public activities$;

  @ViewChild(ActivityPickerComponent)
  public activityPicker: ActivityPickerComponent;

  constructor() {
    this.activities$ = Observable.of([{ id: 'test1', name: 'test', isNonWorking: false }] as IActivityType[]);
  }
}

describe('ActivityPickerComponent', () => {
  let component: TestHostActivityPickerComponent;
  let fixture: ComponentFixture<TestHostActivityPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivityPickerComponent,
        TestHostActivityPickerComponent
      ],
      imports: [
        FormsModule,
        TypeaheadModule.forRoot(),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostActivityPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.activityPicker.typeahead).toBeTruthy();
  });

  fit('should not confirm on enter when typeahead is active', fakeAsync(() => {
    const typeaheadElement = fixture.debugElement.query(By.directive(TypeaheadDirective));
    expect(typeaheadElement).toBeDefined();
    const typeahead = typeaheadElement.injector.get(TypeaheadDirective);
    expect(typeahead).toBeDefined();

    const textInput = fixture.debugElement.query(By.css('input'));
    expect(textInput).toBeDefined('text input not found');
    textInput.nativeElement.value = 't';
    textInput.nativeElement.dispatchEvent(new Event('input'));

    tick();

    expect(typeahead.matches).toBeDefined('typeahead has no matches');
    expect(typeahead.matches.length).toBeGreaterThan(0);

    spyOn(component.activityPicker.confirm, 'emit');
    textInput.nativeElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'enter' }));

    fixture.detectChanges();

    expect(component.activityPicker.confirm.emit).not.toHaveBeenCalled();

    discardPeriodicTasks();
  }));
});
