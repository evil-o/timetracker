import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import { TimeBadgeComponent } from './time-badge.component';
import { DebugElement } from '@angular/core/src/debug/debug_node';

fdescribe('TimeBadgeComponent', () => {
  let component: TimeBadgeComponent;
  let fixture: ComponentFixture<TimeBadgeComponent>;

  let displaySpanDebug: DebugElement;
  let displaySpan: HTMLSpanElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeBadgeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    displaySpanDebug = fixture.debugElement.query(By.css('span'));
    displaySpan = displaySpanDebug.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should properly show times', () => {
  });
});
