import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { provideMockStore } from "@ngrx/store/testing";
import { ActivityLogEntryComponent } from "./activity-log-entry.component";

describe(ActivityLogEntryComponent.name, () => {
    const create = createComponentFactory({
        component: ActivityLogEntryComponent,
        shallow: true,
        providers: [provideMockStore()],
    });
    let spectator: Spectator<ActivityLogEntryComponent>;

    beforeEach(() => {
        spectator = create();
    });

    it("should create", () => {
        expect(spectator.component).toBeTruthy();
    });
});
