import { TodayPage } from "../pages/today.page.cy";

export type HourString = `${number | ""}${number}`;
export type MinuteString = `${number}${number}`;

export class DayPageWorkflows {
    public static readonly defaultActivityType = "e2e test activity";
    public static readonly defaultDescription = "e2e test activity description";
    public static readonly defaultHours: HourString = "3";
    public static readonly defaultMinutes: MinuteString = "45";

    public constructor(private today: TodayPage) {}

    public enterLogEntry(
        activityType: string = DayPageWorkflows.defaultActivityType,
        description: string = DayPageWorkflows.defaultDescription,
        hours: HourString | number = DayPageWorkflows.defaultHours,
        minutes: MinuteString | number = DayPageWorkflows.defaultMinutes
    ): void {
        cy.log("create log entry");
        this.today.addActivity.activityInput.clear().type(activityType);
        this.today.addActivity.activityDescription.clear().type(description);
        this.today.addActivity.activityDudation
            .clear()
            .type(`${hours}:${minutes}`);
        this.today.addActivity.logActivityButton.click();
    }

    public expectEntryTime(
        activity = DayPageWorkflows.defaultActivityType,
        hours: HourString = DayPageWorkflows.defaultHours,
        minutes: MinuteString = DayPageWorkflows.defaultMinutes
    ): void {
        this.today.actvityLogList.entries
            .contains(activity)
            .find("app-hour-badge")
            .should("contain.text", `${hours}h ${minutes}m`);
    }
}
