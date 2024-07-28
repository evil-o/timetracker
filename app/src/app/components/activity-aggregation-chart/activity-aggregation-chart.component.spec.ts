import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityAggregationChartComponent } from './activity-aggregation-chart.component';

describe('ActivityAggregationChartComponent', () => {
  let component: ActivityAggregationChartComponent;
  let fixture: ComponentFixture<ActivityAggregationChartComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ActivityAggregationChartComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityAggregationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
