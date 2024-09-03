import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { WeekSelectorComponent } from "./week-selector.component";

describe(WeekSelectorComponent.name, () => {
    const create = createComponentFactory({
        component: WeekSelectorComponent,
        shallow: true,
    });
    let spectator: Spectator<WeekSelectorComponent>;

    beforeEach(() => {
        spectator = create();
    });

    it("creates", () => {
        expect(spectator.component).toBeDefined();
    });
});
