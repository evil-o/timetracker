import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreModule } from '@ngrx/store';
import { ActivityColorPickerComponent } from '../activity-color-picker/activity-color-picker.component';
import { ActivityTypeListComponent } from './activity-type-list.component';

describe('ActivityTypeListComponent', () => {
  let component: ActivityTypeListComponent;
  let fixture: ComponentFixture<ActivityTypeListComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivityColorPickerComponent,
        ActivityTypeListComponent
      ],
      imports: [
        StoreModule.forRoot(),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
