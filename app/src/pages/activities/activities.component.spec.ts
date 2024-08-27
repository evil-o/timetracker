import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { provideMockStore } from "@ngrx/store/testing";
import { MockProvider } from "ng-mocks";
import { BsModalService } from "ngx-bootstrap/modal";
import { ActivitiesComponent } from "./activities.component";

describe(ActivitiesComponent.name, () => {
    const create = createComponentFactory({
        component: ActivitiesComponent,
        providers: [
            provideMockStore({ initialState: { activityTypes: [] } }),
            MockProvider(BsModalService),
        ],
    });
    let spectator: Spectator<ActivitiesComponent>;
    let component: ActivitiesComponent;

    beforeEach(() => {
        spectator = create();
        component = spectator.component;
    });

    it("creates", () => {
        expect(component).toBeTruthy();
    });
});
