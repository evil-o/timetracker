import { Component, input, output } from "@angular/core";

@Component({
    selector: "app-quick-day-picker",
    templateUrl: "./quick-day-picker.html",
})
export class QuickDayPickerComponent {
    public date = input.required<Date | null>();

    public datePicked = output<Date>();

    protected pickToday() {
        this.emitDatePicked(new Date());
    }

    protected pickNextDay() {
        this.skipDays(+1);
    }

    protected pickPreviousDay() {
        this.skipDays(-1);
    }

    protected skipDays(days: number) {
        const current = this.date();
        if (!current) {
            return;
        }

        const newDate = new Date(current);
        newDate.setDate(newDate.getDate() + days);
        this.emitDatePicked(newDate);
    }

    protected emitDatePicked(value: Date): void {
        this.datePicked.emit(value);
    }
}
