import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { TallyComponent } from "./tally.component";

describe(TallyComponent.name, () => {
    const create = createComponentFactory({
        component: TallyComponent,
        shallow: true,
    });
    let spectator: Spectator<TallyComponent>;

    beforeEach(() => {
        spectator = create();
    });

    it("should create", () => {
        expect(spectator.component).toBeTruthy();
    });
});
