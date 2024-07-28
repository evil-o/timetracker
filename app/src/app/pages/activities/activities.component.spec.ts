import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesComponent } from './activities.component';
import { ActivityTypeListComponent } from '../../components/activity-type-list/activity-type-list.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../redux/reducers';
import { ActivityColorPickerComponent } from '../../components/activity-color-picker/activity-color-picker.component';
import { ActivityPickerComponent } from '../../components/activity-picker/activity-picker.component';
import { FormsModule } from '@angular/forms';
import { TypeaheadModule, ModalModule } from 'ngx-bootstrap';

describe('ActivitiesComponent', () => {
  let component: ActivitiesComponent;
  let fixture: ComponentFixture<ActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivityColorPickerComponent,
        ActivityPickerComponent,
        ActivitiesComponent,
        ActivityTypeListComponent,
      ],
      imports: [
        FormsModule,
        ModalModule.forRoot(),
        StoreModule.forRoot(reducers),
        TypeaheadModule.forRoot(),
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
