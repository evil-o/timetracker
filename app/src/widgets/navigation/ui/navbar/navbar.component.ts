import {
    Component,
    ElementRef,
    EventEmitter,
    Output,
    ViewChild,
} from "@angular/core";

import { Store } from "@ngrx/store";
import { ApplicationState } from "../../../../entities/application";

import { Observable } from "rxjs";
import {
    fromApplication,
    IAttendanceWithTimes,
} from "../../../../entities/application";
import { importActions } from "../../../../entities/import";
import { storageVersionActions } from "../../../../entities/storage-version";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    standalone: false,
})
export class NavbarComponent {
    @Output()
    public createActivityEvent = new EventEmitter<string>();

    @ViewChild("importFileSelector")
    private importFileElement!: ElementRef;

    public entries = [
        { label: "Today", link: "today", icon: "calendar", id: "today" },
        { label: "Week", link: "week", icon: "calendar-alt", id: "week" },
        {
            label: "Activities",
            link: "activities",
            icon: "paper-plane",
            id: "activities",
        },
        {
            label: "Statistics",
            link: "statistics",
            icon: "chart-bar",
            id: "statistics",
        },
    ];

    public attendances$: Observable<IAttendanceWithTimes[]>;

    public overallAttendanceSum$: Observable<number | undefined>;

    public constructor(private store: Store<ApplicationState>) {
        this.attendances$ = this.store.select(
            fromApplication.attendanceEntriesWithOvertime
        );

        this.overallAttendanceSum$ = this.store.select(
            fromApplication.overtimeSum
        );
    }

    public createActivity(name: string) {
        this.createActivityEvent.emit(name);
    }

    protected downloadStorage() {
        this.store.dispatch(storageVersionActions.exportStorage());
    }

    protected importStorage() {
        const element = this.importFileElement
            .nativeElement as HTMLInputElement;
        const files = element!.files!;

        if (files.length < 1) {
            throw new Error(`Expected one file, but got ${files.length}`);
        }
        const file = files[0];
        const reader = new FileReader();
        reader.onloadend = (ev) => {
            const content = ev.target?.result;
            if (!content) {
                throw new Error(`File content is empty: ${content}`);
            }
            this.store.dispatch(
                importActions.fromFile({
                    fileContent: content.toString(),
                })
            );
        };
        reader.readAsText(file, "utf-8");
    }

    protected importStorageOpenFile() {
        this.importFileElement.nativeElement.click();
    }
}
