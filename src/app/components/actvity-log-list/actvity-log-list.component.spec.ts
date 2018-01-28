import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityLogListComponent } from './actvity-log-list.component';

describe('ActvityLogListComponent', () => {
  let component: ActivityLogListComponent;
  let fixture: ComponentFixture<ActivityLogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityLogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
