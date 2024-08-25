import { Component, Input } from "@angular/core";

@Component({
    selector: "app-time-badge",
    templateUrl: "./time-badge.component.html",
})
export class TimeBadgeComponent {
    @Input() set date(value: Date | undefined | null) {
        if (value) {
            this.dateDisplayString = `${value.getHours()}:${this.zeroFill(2, value.getMinutes())}`;
        } else {
            this.dateDisplayString = "-";
        }
    }

    public dateDisplayString = "";

    zeroFill(numDigits: number, numberToShow: number) {
        const str = "" + numberToShow;
        if (str.length >= numDigits) {
            return str;
        } else {
            return "0".repeat(numDigits - str.length) + str;
        }
    }
}
