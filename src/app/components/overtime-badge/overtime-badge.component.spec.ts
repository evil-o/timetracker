import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeBadgeComponent } from './overtime-badge.component';

describe('OvertimeBadgeComponent', () => {
  let component: OvertimeBadgeComponent;
  let fixture: ComponentFixture<OvertimeBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvertimeBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimeBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
