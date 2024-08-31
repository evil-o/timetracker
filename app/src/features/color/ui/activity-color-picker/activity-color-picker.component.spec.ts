import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { ActivityColorPickerComponent } from "./activity-color-picker.component";

describe(ActivityColorPickerComponent.name, () => {
    const create = createComponentFactory({
        component: ActivityColorPickerComponent,
        shallow: false,
    });
    let spectator: Spectator<ActivityColorPickerComponent>;

    beforeEach(() => {
        spectator = create();
    });

    it("should create", () => {
        expect(spectator.component).toBeTruthy();
    });
});
