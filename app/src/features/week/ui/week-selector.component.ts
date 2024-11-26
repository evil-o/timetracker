import { Component, computed, input, output, Signal } from "@angular/core";
import {
    getFirstDayOfCalendarWeek,
    getLastDayOfCalendarWeek,
} from "../../../shared/lib";
import { IWeekDate } from "../../../widgets/week";

@Component({
    selector: "app-week-selector",
    templateUrl: "./week-selector.component.html",
    standalone: false,
})
export class WeekSelectorComponent {
    public selectedWeek = input<IWeekDate>();

    public weekSelected = output<IWeekDate>();

    protected startDate: Signal<Date | undefined> = computed(() => {
        const selectedWeek = this.selectedWeek();
        if (!selectedWeek) {
            return undefined;
        }
        return getFirstDayOfCalendarWeek(selectedWeek.year, selectedWeek.week);
    });

    protected endDate: Signal<Date | undefined> = computed(() => {
        const selectedWeek = this.selectedWeek();
        if (!selectedWeek) {
            return undefined;
        }
        return getLastDayOfCalendarWeek(selectedWeek.year, selectedWeek.week);
    });

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
