import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { MockComponents, MockedComponent, MockPipe } from "ng-mocks";
import { FormatHoursPipe } from "../../../../shared/lib";
import { EditableItemComponent } from "../../../../shared/ui";
import { createActivityLogEntry } from "../../models/activity-log-entry.faker";
import { ActivityLogEntry } from "../../models/activity-log.state";
import { EditableLogEntryHoursComponent } from "./editable-log-entry-hours.component";

describe(EditableLogEntryHoursComponent.name, () => {
    const create = createComponentFactory({
        component: EditableLogEntryHoursComponent,
        shallow: true,
        declarations: [
            MockPipe(FormatHoursPipe),
            MockComponents(EditableItemComponent),
        ],
    });

    let spectator: Spectator<EditableLogEntryHoursComponent>;
    let entry: ActivityLogEntry;
    let editableItem: MockedComponent<EditableItemComponent>;

    beforeEach(() => {
        entry = createActivityLogEntry();
        spectator = create({ props: { entry } });
        editableItem = spectator.query(
            EditableItemComponent
        ) as MockedComponent<EditableItemComponent>;

        spyOn(spectator.component.changeEntryHours, "emit");
    });

    it("should create", () => {
        expect(spectator.component).toBeTruthy();
    });

    it("should reject invalid strings", () => {
        for (const invalidEntry of [
            "not a number",
            "not: a number",
            "not: 0",
            "1: not a number either",
        ]) {
            editableItem.submitItem.emit(invalidEntry);
            expect(spectator.component.changeEntryHours.emit)
                .withContext(invalidEntry)
                .not.toHaveBeenCalled();
        }
    });

    it('should send hours for "," decimal separator', () => {
        editableItem.submitItem.emit("1,25");
        expect(
            spectator.component.changeEntryHours.emit
        ).toHaveBeenCalledOnceWith({ entryId: entry.id, newHours: 1.25 });
    });

    it('should send hours for "." decimal separator', () => {
        editableItem.submitItem.emit("1.25");
        expect(
            spectator.component.changeEntryHours.emit
        ).toHaveBeenCalledOnceWith({ entryId: entry.id, newHours: 1.25 });
    });

    it('should send hours for strings starting with "."', () => {
        editableItem.submitItem.emit(".25");
        expect(
            spectator.component.changeEntryHours.emit
        ).toHaveBeenCalledOnceWith({ entryId: entry.id, newHours: 0.25 });
    });

    it('should support "h:m" input format', () => {
        editableItem.submitItem.emit("0:15");
        expect(
            spectator.component.changeEntryHours.emit
        ).toHaveBeenCalledOnceWith({ entryId: entry.id, newHours: 0.25 });
    });

    it('should support ":m" input format', () => {
        editableItem.submitItem.emit(":30");
        expect(
            spectator.component.changeEntryHours.emit
        ).toHaveBeenCalledOnceWith({ entryId: entry.id, newHours: 0.5 });
    });
});
