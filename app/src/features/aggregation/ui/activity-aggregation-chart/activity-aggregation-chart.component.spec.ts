import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { ActivityAggregationChartComponent } from "./activity-aggregation-chart.component";

describe(ActivityAggregationChartComponent.name, () => {
    const create = createComponentFactory({
        component: ActivityAggregationChartComponent,
    });
    let spectator: Spectator<ActivityAggregationChartComponent>;
    let component: ActivityAggregationChartComponent;

    beforeEach(() => {
        spectator = create();
        component = spectator.component;
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
