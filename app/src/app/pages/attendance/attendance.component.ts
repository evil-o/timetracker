import { Component, ElementRef, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";

import { BsDatepickerDirective } from "ngx-bootstrap/datepicker";
import { BehaviorSubject } from "rxjs";
import { ApplicationState } from "../../redux/states/application-state";

@Component({
    selector: "app-attendance",
    templateUrl: "./attendance.component.html",
    styleUrls: ["./attendance.component.css"],
})
export class AttendanceComponent {
    public date$ = new BehaviorSubject<Date>(new Date());

    // TODO these and start/endDatePicking are copies from DayComponent; introduce common header component
    public pickingDate = false;

    @ViewChild("datePickerInput")
    private datePickerInput!: ElementRef;

    @ViewChild("datePicker")
    private datePicker!: BsDatepickerDirective;

    constructor(public store: Store<ApplicationState>) {}

    startDatePicking() {
        this.pickingDate = true;
        this.datePickerInput.nativeElement.focus();
        this.datePicker.show();
    }

    endDatePicking() {
        const date = new Date(this.datePickerInput.nativeElement.value);
        this.pickingDate = false;
        this.date$.next(date);
    }
}
