import { fakeAsync, tick } from "@angular/core/testing";
import { byTestId, createComponentFactory, Spectator } from "@ngneat/spectator";
import { MockPipe } from "ng-mocks";
import { FormatHoursPipe } from "../../../../shared/lib";
import { createActivityLogEntry } from "../../models/activity-log-entry.faker";
import { EditableLogEntryHoursComponent } from "./editable-log-entry-hours.component";

describe(EditableLogEntryHoursComponent.name, () => {
    const create = createComponentFactory({
        component: EditableLogEntryHoursComponent,
        shallow: true,
        declarations: [MockPipe(FormatHoursPipe)],
    });

    let spectator: Spectator<EditableLogEntryHoursComponent>;
    let entry;
    let editGroup: HTMLElement;

    function startEditing(): void {
        spectator.dispatchMouseEvent(editGroup, "dblclick");
    }

    beforeEach(() => {
        entry = createActivityLogEntry();
        spectator = create({ props: { entry } });

        editGroup = spectator.query(
            byTestId("hours-input-group")
        ) as HTMLElement;
    });

    it("should create", () => {
        expect(spectator.component).toBeTruthy();
    });

    it("should reject invalid strings", fakeAsync(() => {
        startEditing();

        spyOn(spectator.component.changeEntryHours, "emit");
        spectator.component.emitChangeHours("not a number");
        tick();
        expect(
            spectator.component.changeEntryHours.emit
        ).not.toHaveBeenCalled();

        spectator.component.emitChangeHours("not: a number");
        tick();
        expect(
            spectator.component.changeEntryHours.emit
        ).not.toHaveBeenCalled();

        spectator.component.emitChangeHours("not: 0");
        tick();
        expect(
            spectator.component.changeEntryHours.emit
        ).not.toHaveBeenCalled();

        spectator.component.emitChangeHours("1: not a number either");
        tick();
        expect(
            spectator.component.changeEntryHours.emit
        ).not.toHaveBeenCalled();
    }));

    it('should send hours for "," decimal separator', fakeAsync(() => {
        startEditing();

        spyOn(spectator.component.changeEntryHours, "emit");
        spectator.component.changeEntryHours.subscribe((v) => {
            expect(v.newHours).toBe(1.25);
        });

        spectator.component.emitChangeHours("1,25");
        tick();
        expect(spectator.component.changeEntryHours.emit).toHaveBeenCalled();
    }));

    it('should send hours for "." decimal separator', fakeAsync(() => {
        startEditing();

        spyOn(spectator.component.changeEntryHours, "emit");
        spectator.component.changeEntryHours.subscribe((v) => {
            expect(v.newHours).toBe(1.25);
        });

        spectator.component.emitChangeHours("1.25");
        tick();
        expect(spectator.component.changeEntryHours.emit).toHaveBeenCalled();
    }));

    it('should send hours for strings starting with "."', fakeAsync(() => {
        startEditing();

        spyOn(spectator.component.changeEntryHours, "emit");
        spectator.component.changeEntryHours.subscribe((v) => {
            expect(v.newHours).toBe(0.25);
        });

        spectator.component.emitChangeHours(".25");
        tick();
        expect(spectator.component.changeEntryHours.emit).toHaveBeenCalled();
    }));

    it('should support "h:m" input format', fakeAsync(() => {
        startEditing();

        spyOn(spectator.component.changeEntryHours, "emit");
        spectator.component.changeEntryHours.subscribe((v) => {
            expect(v.newHours).toBe(0.25);
        });

        spectator.component.emitChangeHours("0:15");
        tick();
        expect(spectator.component.changeEntryHours.emit).toHaveBeenCalled();
    }));

    it('should support ":m" input format', fakeAsync(() => {
        startEditing();

        spyOn(spectator.component.changeEntryHours, "emit");
        spectator.component.changeEntryHours.subscribe((v) => {
            expect(v.newHours).toBe(0.5);
        });

        spectator.component.emitChangeHours(":30");
        tick();
        expect(spectator.component.changeEntryHours.emit).toHaveBeenCalled();
    }));
});
