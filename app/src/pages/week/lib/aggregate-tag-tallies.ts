import {
    IActivityLogEntry,
    parseDescription,
    TokenType,
} from "../../../entities/activity-log";
import { TagTallies } from "../../../widgets/activity-log";

export function getTagsFromDescription(description: string): string[] {
    const parsed = parseDescription(description);
    const tagTokens = parsed.filter((token) => token.type === TokenType.Tag);
    return tagTokens.map((tagToken) => tagToken.toString());
}

export function addEntryToTagTallies(
    tallies: TagTallies,
    tag: string,
    entry: IActivityLogEntry
): void {
    if (!(tag in tallies)) {
        tallies[tag] = { totalHoursForThisTag: entry.hours, logs: [entry] };
    } else {
        const tally = tallies[tag];
        tally.totalHoursForThisTag += entry.hours;
        tally.logs.push(entry);
    }
}

export function aggregateTagTallies(entries: IActivityLogEntry[]): TagTallies {
    const tallies: TagTallies = {};

    for (const entry of entries) {
        if (!entry.description) {
            continue;
        }
        const tags = getTagsFromDescription(entry.description);
        for (const tag of tags) {
            addEntryToTagTallies(tallies, tag, entry);
        }
    }

    return tallies;
}
