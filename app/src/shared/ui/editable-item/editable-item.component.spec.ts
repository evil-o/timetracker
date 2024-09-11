import { faker } from "@faker-js/faker";
import { byTestId, createHostFactory, SpectatorHost } from "@ngneat/spectator";
import { EditableItemComponent } from "./editable-item.component";

describe(EditableItemComponent.name, () => {
    const create = createHostFactory({
        component: EditableItemComponent,
        shallow: true,
    });

    let spectator: SpectatorHost<EditableItemComponent>;

    const viewTestId = "test-view-component";
    let view: Element | undefined;
    let readonlyWrapper: Element | undefined;
    let itemInput: Element | undefined;
    let confirm: Element | undefined;
    let cancel: Element | undefined;

    const reQuery = () => {
        view = spectator.query(byTestId(viewTestId)) ?? undefined;
        readonlyWrapper = spectator.query(
            byTestId("item-readonly-mode")
        ) as Element;
        itemInput = spectator.query(byTestId("item-input")) as Element;
        confirm = spectator.query(byTestId("confirm-item-change")) as Element;
        cancel = spectator.query(byTestId("cancel-item-change")) as Element;
    };

    const enterEditMode = () => {
        spectator.dispatchMouseEvent(readonlyWrapper, "dblclick");
        spectator.detectChanges();

        reQuery();
    };

    beforeEach(() => {
        spectator = create(
            `<app-editable-item [textValue]="'test'"><span data-testid="${viewTestId}">View</span></app-editable-item>`
        );

        reQuery();
    });

    it("initially renders the view component", () => {
        expect(view).toBeTruthy();
        expect(readonlyWrapper).toBeTruthy();
    });

    it("enters editing mode on double click and shows the right components", () => {
        enterEditMode();

        expect(view).toBeFalsy();
        expect(readonlyWrapper).toBeFalsy();
        expect(itemInput).toBeTruthy();
        expect(cancel).toBeTruthy();
    });

    it("leaves editing mode on cancel click", () => {
        enterEditMode();

        spectator.click(cancel);
        reQuery();
        expect(view).toBeTruthy();
        expect(itemInput).toBeFalsy();
    });

    it("leaves editing mode on escape", () => {
        enterEditMode();

        spectator.dispatchKeyboardEvent(itemInput!, "keyup", "escape");
        reQuery();
        expect(view).toBeTruthy();
        expect(itemInput).toBeFalsy();
    });

    it("submits and leaves editing mode on confirm click", () => {
        enterEditMode();

        spyOn(spectator.component.submit, "emit");

        const mockValue = faker.word.sample(3);
        spectator.typeInElement(mockValue, itemInput);
        spectator.click(confirm);
        reQuery();
        expect(view).toBeTruthy();
        expect(itemInput).toBeFalsy();
        expect(spectator.component.submit.emit).toHaveBeenCalledOnceWith(
            mockValue
        );
    });

    it("submits and leaves editing mode on enter", () => {
        enterEditMode();

        spyOn(spectator.component.submit, "emit");

        const mockValue = faker.word.sample(3);
        spectator.typeInElement(mockValue, itemInput);
        spectator.dispatchKeyboardEvent(itemInput!, "keyup", "enter");
        reQuery();
        expect(view).toBeTruthy();
        expect(itemInput).toBeFalsy();
        expect(spectator.component.submit.emit).toHaveBeenCalledOnceWith(
            mockValue
        );
    });
});
