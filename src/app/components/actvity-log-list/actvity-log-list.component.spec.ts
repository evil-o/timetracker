import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActvityLogListComponent } from './actvity-log-list.component';

describe('ActvityLogListComponent', () => {
  let component: ActvityLogListComponent;
  let fixture: ComponentFixture<ActvityLogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActvityLogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActvityLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
