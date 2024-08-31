import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { provideMockStore } from "@ngrx/store/testing";
import { ActivityTypeListComponent } from "./activity-type-list.component";

describe(ActivityTypeListComponent.name, () => {
    const create = createComponentFactory({
        component: ActivityTypeListComponent,
        shallow: true,
        providers: [provideMockStore()],
    });
    let spectator: Spectator<ActivityTypeListComponent>;

    beforeEach(() => {
        spectator = create();
    });

    it("should create", () => {
        expect(spectator.component).toBeTruthy();
    });
});
