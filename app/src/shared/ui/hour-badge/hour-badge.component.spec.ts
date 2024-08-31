import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { MockPipes } from "ng-mocks";
import { FormatHoursPipe } from "../../lib";
import { HourBadgeComponent } from "./hour-badge.component";

describe(HourBadgeComponent.name, () => {
    const create = createComponentFactory({
        component: HourBadgeComponent,
        shallow: true,
        declarations: [MockPipes(FormatHoursPipe)],
    });
    let spectator: Spectator<HourBadgeComponent>;

    beforeEach(() => {
        spectator = create();
    });

    it("should create", () => {
        expect(spectator.component).toBeTruthy();
    });
});
