import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { BehaviorSubject, Observable } from "rxjs";
import { activityLog, activityTypes } from "../../app/redux/selectors";
import { IActivityTypes } from "../../app/redux/states/activity-types";
import { ApplicationState } from "../../app/redux/states/application-state";
import { IActivityLog } from "../../entities/activity-log/activity-log.types";

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
    styleUrls: ["./statistics.component.css"],
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

    constructor(store: Store<ApplicationState>) {
        this.allActivities$ = store.select(activityLog);
        this.types$ = store.select(activityTypes);

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
