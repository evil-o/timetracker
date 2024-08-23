import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from "@angular/core";

import { TypeaheadDirective } from "ngx-bootstrap/typeahead";
import { IActivityType } from "../../../entities/activity-types/models/activity-types.types";

@Component({
    selector: "app-activity-picker",
    templateUrl: "./activity-picker.component.html",
    styleUrls: ["./activity-picker.component.css"],
})
export class ActivityPickerComponent {
    @Input()
    public set activities(activities: IActivityType[] | undefined) {
        this.items = activities ? activities.filter((v) => !v.isArchived) : [];
    }

    @Input()
    public placeholder = "What are you doing?";

    @Output()
    public confirm = new EventEmitter<void>();

    @ViewChild("textInput")
    public textInput!: ElementRef;

    @ViewChild(TypeaheadDirective)
    public typeahead!: TypeaheadDirective;

    public items: IActivityType[] = [];

    public name = "";

    public id = "";

    selected(selection: { item?: IActivityType }) {
        if (selection.item) {
            this.name = selection.item.name;
            this.id = selection.item.id;
        } else {
            this.name = "";
            this.id = "";
        }
        this.confirm.emit();
    }

    focus() {
        this.textInput.nativeElement.focus();
    }
}
