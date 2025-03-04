import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { BehaviorSubject, Observable } from "rxjs";
import { fromActivityLog, IActivityLog } from "../../../entities/activity-log";
import {
    fromActivityTypes,
    IActivityTypes,
} from "../../../entities/activity-type";
import { ApplicationState } from "../../../entities/application";

function getMonthDateRange(year: number, month: number) {
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);
    return { start, end };
}

function getYearDateRange(year: number) {
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);
    return { start, end };
}

@Component({
    selector: "app-statistics",
    templateUrl: "./statistics.component.html",
    standalone: false,
})
export class StatisticsComponent {
    public startDateCurrentMonth$: BehaviorSubject<Date>;

    public endDateCurrentMonth$: BehaviorSubject<Date>;

    public startDateLastMonth$: BehaviorSubject<Date>;

    public endDateLastMonth$: BehaviorSubject<Date>;

    public startDateCurrentYear$: BehaviorSubject<Date>;

    public endDateCurrentYear$: BehaviorSubject<Date>;

    public startDateLastYear$: BehaviorSubject<Date>;

    public endDateLastYear$: BehaviorSubject<Date>;

    public allActivities$: Observable<IActivityLog>;

    public types$: Observable<IActivityTypes>;

    public constructor(store: Store<ApplicationState>) {
        this.allActivities$ = store.select(fromActivityLog.allActivities);
        this.types$ = store.select(fromActivityTypes.getState);

        const now = new Date();

        // current month
        {
            const { start, end } = getMonthDateRange(
                now.getFullYear(),
                now.getMonth()
            );
            this.startDateCurrentMonth$ = new BehaviorSubject(start);
            this.endDateCurrentMonth$ = new BehaviorSubject(end);
        }

        // last month
        {
            const { start, end } = getMonthDateRange(
                now.getFullYear(),
                now.getMonth() - 1
            );
            this.startDateLastMonth$ = new BehaviorSubject(start);
            this.endDateLastMonth$ = new BehaviorSubject(end);
        }

        // current year
        {
            const { start, end } = getYearDateRange(now.getFullYear());
            this.startDateCurrentYear$ = new BehaviorSubject(start);
            this.endDateCurrentYear$ = new BehaviorSubject(end);
        }

        // last year
        {
            const { start, end } = getYearDateRange(now.getFullYear() - 1);
            this.startDateLastYear$ = new BehaviorSubject(start);
            this.endDateLastYear$ = new BehaviorSubject(end);
        }
    }
}
