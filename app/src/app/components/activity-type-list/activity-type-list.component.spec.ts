import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTypeListComponent } from './activity-type-list.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../redux/reducers';
import { ActivityColorPickerComponent } from '../activity-color-picker/activity-color-picker.component';

describe('ActivityTypeListComponent', () => {
  let component: ActivityTypeListComponent;
  let fixture: ComponentFixture<ActivityTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivityColorPickerComponent,
        ActivityTypeListComponent
      ],
      imports: [
        StoreModule.forRoot(reducers),
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
