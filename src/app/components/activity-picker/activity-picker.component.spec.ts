import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap';

import { ActivityPickerComponent } from './activity-picker.component';
import { Subject } from 'rxjs/Subject';
import { IActivityType } from '../../models/interfaces';

@Component({
  selector: `app-test-host-activity-picker-component`,
  template: `<app-activity-picker [activities$]="activities$"></app-activity-picker>`
})
class TestHostActivityPickerComponent {
  public activities$ = new Subject<IActivityType[]>();

  @ViewChild(ActivityPickerComponent)
  public activityPicker: ActivityPickerComponent;
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
  });
});
