import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from "@angular/core";

import { NgbTypeaheadSelectItemEvent } from "@ng-bootstrap/ng-bootstrap";
import {
    debounceTime,
    distinctUntilChanged,
    map,
    Observable,
    OperatorFunction,
} from "rxjs";
import { IActivityType } from "../../models/activity-types.types";

@Component({
    selector: "app-activity-picker",
    templateUrl: "./activity-picker.component.html",
    standalone: false,
})
export class ActivityPickerComponent {
    @Input()
    public placeholder = "What are you doing?";

    @Output()
    public confirm = new EventEmitter<void>();

    @ViewChild("textInput")
    public textInput!: ElementRef;

    public items: IActivityType[] = [];

    public name = "";

    public id = "";

    @Input()
    public set activities(activities: IActivityType[] | undefined) {
        this.items = activities ? activities.filter((v) => !v.isArchived) : [];
    }

    public focus() {
        this.textInput.nativeElement.focus();
    }

    protected typeahead$: OperatorFunction<string, readonly IActivityType[]> = (
        text$: Observable<string>
    ) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map((term) =>
                this.items
                    .filter(
                        (item) =>
                            item.name.length > 0 &&
                            item.name
                                .toLowerCase()
                                .indexOf(term.toLowerCase()) > -1
                    )
                    .slice(0, 10)
            )
        );

    protected typeaheadFormatter = (activity: IActivityType) => activity.name;

    protected selected(selection: NgbTypeaheadSelectItemEvent<IActivityType>) {
        if (selection.item) {
            this.name = selection.item.name;
            this.id = selection.item.id;
        } else {
            this.name = "";
            this.id = "";
        }
        this.confirm.emit();
    }
}
