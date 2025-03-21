import { Component, OnInit } from "@angular/core";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ApplicationState } from "../../../entities/application";
import {
    configurationActions,
    fromConfiguration,
} from "../../../entities/configuration";

@Component({
    selector: "app-configuration",
    templateUrl: "./configuration.component.html",
    standalone: false,
})
export class ConfigurationComponent implements OnInit {
    public workingHoursPerWeek$!: Observable<number>;

    public workingDaysPerWeek$!: Observable<number>;

    public inputWorkingHoursPerWeek?: number;

    public inputWorkingDaysPerWeek?: number;

    public constructor(public store: Store<ApplicationState>) {}

    public ngOnInit() {
        this.workingHoursPerWeek$ = this.store.select(
            fromConfiguration.weeklyWorkingHours
        );
        this.workingDaysPerWeek$ = this.store.select(
            fromConfiguration.weeklyWorkingDays
        );
    }

    public applyValues() {
        if (this.inputWorkingHoursPerWeek) {
            this.store.dispatch(
                configurationActions.setWeeklyWorkHours({
                    newWeeklyHours: this.inputWorkingHoursPerWeek,
                })
            );
        }
        if (this.inputWorkingDaysPerWeek) {
            this.store.dispatch(
                configurationActions.setWeeklyWorkDays({
                    newWeeklyWorkDays: this.inputWorkingDaysPerWeek,
                })
            );
        }
    }

    public setInputWorkingHoursPerWeek(value: number | string): void {
        this.inputWorkingHoursPerWeek =
            typeof value === "string" ? Number.parseFloat(value) : value;
    }

    public setInputWorkingDaysPerWeek(value: number | string): void {
        this.inputWorkingHoursPerWeek =
            typeof value === "string" ? Number.parseFloat(value) : value;
    }
}
