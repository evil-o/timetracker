import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesComponent } from './activities.component';
import { ActivityTypeListComponent } from '../../components/activity-type-list/activity-type-list.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../redux/reducers';
import { ActivityColorPickerComponent } from '../../components/activity-color-picker/activity-color-picker.component';

describe('ActivitiesComponent', () => {
  let component: ActivitiesComponent;
  let fixture: ComponentFixture<ActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivityColorPickerComponent,
        ActivitiesComponent,
        ActivityTypeListComponent,
      ],
      imports: [
        StoreModule.forRoot(reducers),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
