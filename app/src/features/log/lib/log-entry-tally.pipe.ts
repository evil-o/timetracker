import { Pipe, PipeTransform } from "@angular/core";
import { IActivityLogEntry, IGroupEntry } from "../../../entities/activity-log";
import { IActivityTypes } from "../../../entities/activity-type";

@Pipe({
    name: "logEntryTally",
    standalone: false,
})
export class LogEntryTallyPipe implements PipeTransform {
    public transform(
        entries: IActivityLogEntry[],
        types: IActivityTypes
    ): IGroupEntry[] {
        if (!entries) {
            return [];
        }

        const tallies: IGroupEntry[] = [];
        for (const entry of entries) {
            let tally = tallies.find((t) => t.activityId === entry.actvitiyId);
            if (tally) {
                tally.entries.push(entry);
                tally.cumulativeHours += entry.hours;
            } else {
                tally = {
                    activityId: entry.actvitiyId,
                    entries: [entry],
                    cumulativeHours: entry.hours,
                };
                tallies.push(tally);
            }
        }

        const activityNameOf = (entry: IGroupEntry) => {
            const type = types.activities.find(
                (t) => t.id === entry.activityId
            );
            if (type) {
                return type.name;
            } else {
                return "Unknown";
            }
        };

        return tallies.sort((a, b) =>
            activityNameOf(a).localeCompare(activityNameOf(b))
        );
    }
}
