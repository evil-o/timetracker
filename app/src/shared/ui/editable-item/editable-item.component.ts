import { Component, ElementRef, input, output, ViewChild } from "@angular/core";

/**
 * An HTML block that can have a display state along with an editable state.
 */
@Component({
    selector: "app-editable-item",
    templateUrl: "./editable-item.component.html",
    standalone: false,
})
export class EditableItemComponent {
    @ViewChild("itemInput")
    private itemInput!: ElementRef<HTMLInputElement>;

    public textValue = input.required<string>();

    public submitItem = output<string>();

    protected editing = false;

    protected onSubmit() {
        this.submitItem.emit(this.itemInput.nativeElement.value);
        this.setEditing(false);
    }

    protected onCancel() {
        this.setEditing(false);
    }

    protected setEditing(editing: boolean) {
        this.editing = editing;

        if (this.editing) {
            setTimeout(() => {
                this.itemInput?.nativeElement.focus();
                this.itemInput?.nativeElement.select();
            }, 0);
        }
    }
}
