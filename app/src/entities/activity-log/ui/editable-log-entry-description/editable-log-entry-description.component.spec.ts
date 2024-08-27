import { createComponentFactory, Spectator } from "@ngneat/spectator";

import { createActivityLogEntry } from "../../models/activity-log-entry.faker";
import { EditableLogEntryDescriptionComponent } from "./editable-log-entry-description.component";

describe(EditableLogEntryDescriptionComponent.name, () => {
    const create = createComponentFactory({
        component: EditableLogEntryDescriptionComponent,
    });

    let spectator: Spectator<EditableLogEntryDescriptionComponent>;

    const setup = () => {
        spectator = create({ props: { entry: createActivityLogEntry() } });
    };

    it("should create", () => {
        setup();

        expect(spectator.component).toBeTruthy();
    });
});
