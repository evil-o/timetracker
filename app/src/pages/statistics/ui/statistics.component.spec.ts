import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { provideMockStore } from "@ngrx/store/testing";
import { StatisticsComponent } from "./statistics.component";

describe(StatisticsComponent.name, () => {
    const create = createComponentFactory({
        component: StatisticsComponent,
        shallow: true,
        providers: [provideMockStore()],
    });
    let spectator: Spectator<StatisticsComponent>;

    beforeEach(() => {
        spectator = create();
    });

    it("should create", () => {
        expect(spectator.component).toBeTruthy();
    });
});
