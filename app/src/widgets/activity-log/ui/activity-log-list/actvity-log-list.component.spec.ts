import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { of } from "rxjs";
import { ActivityLogListComponent } from "./actvity-log-list.component";

describe(ActivityLogListComponent.name, () => {
    const create = createComponentFactory({
        component: ActivityLogListComponent,
        shallow: true,
        providers: [],
    });
    let spectator: Spectator<ActivityLogListComponent>;

    beforeEach(() => {
        spectator = create({
            props: { activityTypes$: of({ activities: [] }), groups$: of([]) },
        });
    });

    it("should create", () => {
        expect(spectator.component).toBeTruthy();
    });
});
