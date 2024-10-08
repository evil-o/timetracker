import { v4 as uuid } from "uuid";

import { createReducer } from "@ngrx/store";
import { WritableDraft } from "immer";
import { compareDatesWithDayReference, produceOn } from "../../../shared/lib";
import { attendanceActions } from "./attendance.actions";
import {
    AttendanceEntry,
    AttendanceState,
    IAttendanceEntry,
} from "./attendance.state";

function findEntry(
    forDate: Date,
    entries: IAttendanceEntry[]
): IAttendanceEntry | undefined {
    return entries.find((e) => AttendanceEntry.equalsDate(e, forDate));
}

function findEntryIndex(forDate: Date, entries: IAttendanceEntry[]): number {
    return entries.findIndex((e) => AttendanceEntry.equalsDate(e, forDate));
}

function updateStartEndTimeInDraft(
    draft: WritableDraft<AttendanceState>,
    date: Date,
    newStart?: Date,
    newEnd?: Date
): void {
    const entryIndex = findEntryIndex(date, draft.entries);
    if (entryIndex < 0) {
        const newEntry = new AttendanceEntry(date);
        if (newStart) {
            newEntry.start = newStart;
        }
        if (newEnd) {
            newEntry.end = newEnd;
        }
        draft.entries.push(newEntry);
    } else {
        const existingEntry = draft.entries[entryIndex];
        if (newStart) {
            existingEntry.start = newStart;
        }
        if (newEnd) {
            existingEntry.end = newEnd;
        }
        // to trigger all relevant updates, we need to copy the entry, pending a better fix
        draft.entries[entryIndex] = {
            ...existingEntry,
        };
    }
}

export const attendanceReducer = createReducer(
    new AttendanceState(),

    produceOn(
        attendanceActions.setStartAndEndTime,
        (draft, { date, start, end }) => {
            updateStartEndTimeInDraft(draft, date, start, end);
        }
    ),

    produceOn(attendanceActions.setStartTime, (draft, { date, start }) => {
        updateStartEndTimeInDraft(draft, date, start);
    }),

    produceOn(attendanceActions.setEndTime, (draft, { date, end }) => {
        updateStartEndTimeInDraft(draft, date, undefined, end);
    }),

    produceOn(attendanceActions.deleteEntry, (draft, { date }) => {
        const idx = findEntryIndex(date, draft.entries);
        if (idx >= 0) {
            draft.entries.splice(idx, 1);
        }
    }),

    produceOn(
        attendanceActions.createCorrection,
        (draft, { year, month, day }) => {
            // TODO: this function is currently needlessly complex because otherwise, a bug appears where the corrections don't show up on the today page
            const entryIndex = draft.entries.findIndex((v) =>
                compareDatesWithDayReference(v.date, { year, month, day })
            );
            let entry: IAttendanceEntry;
            if (entryIndex >= 0) {
                entry = draft.entries[entryIndex];
            } else {
                entry = {
                    date: new Date(year, month, day),
                    corrections: [],
                };
                draft.entries.push(entry);
            }
            if (!entry.corrections) {
                entry.corrections = [];
            }

            entry.corrections.push({
                id: uuid(),
                description: "",
                hours: 0,
            });
            // this is key for the bug fix, i.e., creating a copy of the entry so all observables update
            // needs to be fixed with more refactoring
            draft.entries[entryIndex] = { ...entry };
        }
    ),

    produceOn(
        attendanceActions.updateCorrection,
        (draft, { year, month, day, id, newHours, newDescription }) => {
            const entry = draft.entries.find((v) =>
                compareDatesWithDayReference(v.date, { year, month, day })
            );
            if (!entry) {
                console.warn(
                    `Could not update correction ${id}: no entry found for provided date.`
                );
                return;
            }

            entry.corrections = [
                ...(entry.corrections ?? []).map((c) => ({ ...c })),
            ];
            const correction = entry.corrections.find((c) => c.id === id);
            if (!correction) {
                console.warn(
                    `Could not update correction ${id}: id not found.`
                );
                return;
            }

            correction.hours = Number(newHours);
            correction.description = newDescription;
        }
    ),

    produceOn(
        attendanceActions.deleteCorrection,
        (draft, { year, month, day, id }) => {
            const entry = draft.entries.find((v) =>
                compareDatesWithDayReference(v.date, { year, month, day })
            );
            if (!entry) {
                console.warn(
                    `Could not delete correction ${id}: no entry found for provided date.`
                );
                return;
            }

            entry.corrections = [...(entry.corrections ?? [])];
            const correctionIndex = entry.corrections.findIndex(
                (c) => c.id === id
            );
            if (correctionIndex < 0) {
                console.warn(
                    `Could not delete correction ${id}: id not found.`
                );
                return;
            }

            entry.corrections.splice(correctionIndex, 1);
        }
    ),

    produceOn(attendanceActions.import, (draft, { data }) => {
        // merge imported attendances into new ones
        for (const entry of data.entries) {
            const matchingEntry = findEntry(
                new Date(entry.date),
                draft.entries
            );
            if (matchingEntry !== undefined) {
                console.warn(
                    "OVERWRITING attendance entry for",
                    matchingEntry.date.toLocaleDateString()
                );
                // overwrite if there is already an entry
                matchingEntry.start = entry.start;
                matchingEntry.end = entry.end;
                matchingEntry.corrections = entry.corrections;
            } else {
                // add a new entry
                draft.entries.push({ ...entry });
            }
        }
    })
);
