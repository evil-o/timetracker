import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { NoActivityLogEntryPresentComponent } from "./no-activity-log-entry-present.component";

describe(NoActivityLogEntryPresentComponent.name, () => {
    const create = createComponentFactory({
        component: NoActivityLogEntryPresentComponent,
    });
    let spectator: Spectator<NoActivityLogEntryPresentComponent>;

    beforeEach(() => {
        spectator = create();
    });

    it("should create", () => {
        expect(spectator.component).toBeTruthy();
    });
});
