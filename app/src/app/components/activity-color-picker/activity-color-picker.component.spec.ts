import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityColorPickerComponent } from './activity-color-picker.component';

describe('ActivityColorPickerComponent', () => {
  let component: ActivityColorPickerComponent;
  let fixture: ComponentFixture<ActivityColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityColorPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
