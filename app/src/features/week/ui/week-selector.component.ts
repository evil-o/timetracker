import { Component, input, output } from "@angular/core";
import { IWeekDate } from "../../../widgets/week";

@Component({
    selector: "app-week-selector",
    templateUrl: "./week-selector.component.html",
})
export class WeekSelectorComponent {
    public selectedWeek = input<IWeekDate>();

    public weekSelected = output<IWeekDate>();

    protected selectPreviousYear(): void {
        this.changeYear(-1);
    }

    protected selectNextYear(): void {
        this.changeYear(1);
    }

    protected selectPreviousWeek(): void {
        this.changeWeek(-1);
    }

    protected selectNextWeek(): void {
        this.changeWeek(1);
    }

    private changeYear(diff: number): void {
        const week = this.selectedWeek();
        if (!week) {
            return;
        }

        this.weekSelected.emit({
            year: week.year + diff,
            week: week.week,
        });
    }

    private changeWeek(diff: number): void {
        // TODO: breaks when going forward over the number of weeks in the year, when moving by more than one week
        const week = this.selectedWeek();
        if (!week) {
            return;
        }

        let newWeek = week.week + diff;
        let newWeekYear = week.year;
        if (newWeek < 1) {
            newWeek = 52;
            newWeekYear -= 1;
        }

        this.weekSelected.emit({
            year: newWeekYear,
            week: newWeek,
        });
    }
}
