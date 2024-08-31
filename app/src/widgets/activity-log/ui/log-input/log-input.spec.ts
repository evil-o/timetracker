import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { LogInputComponent } from "./log-input";

describe(LogInputComponent.name, () => {
    const create = createComponentFactory({
        component: LogInputComponent,
        shallow: true,
    });

    let spectator: Spectator<LogInputComponent>;

    beforeEach(() => {
        spectator = create({ props: { activities: [] } });
    });

    it("creates", () => {
        expect(spectator.component).toBeTruthy();
    });
});
