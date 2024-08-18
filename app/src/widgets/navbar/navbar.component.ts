import {
    Component,
    ElementRef,
    EventEmitter,
    Output,
    ViewChild,
} from "@angular/core";

import { Store } from "@ngrx/store";
import { IAttendanceWithTimes } from "../../app/redux/selectors/index";
import { ApplicationState } from "../../app/redux/states/application-state";

import { Observable } from "rxjs";
import { storageVersionActions } from "../../app/redux/actions/storage-version.actions";
import * as fromStore from "../../app/redux/selectors";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
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

    @Output()
    public createActivityEvent = new EventEmitter<string>();

    public attendances$: Observable<IAttendanceWithTimes[]>;

    public overallAttendanceSum$: Observable<number | undefined>;

    constructor(private store: Store<ApplicationState>) {
        this.attendances$ = this.store.select(
            fromStore.attendanceEntriesWithOvertime
        );

        this.overallAttendanceSum$ = this.store.select(fromStore.overtimeSum);
    }

    public createActivity(name: string) {
        this.createActivityEvent.emit(name);
    }

    downloadStorage() {
        this.store.dispatch(storageVersionActions.exportStorage());
    }

    importStorage() {
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
                storageVersionActions.importStorageFile({
                    fileContent: content.toString(),
                })
            );
        };
        reader.readAsText(file, "utf-8");
    }

    importStorageOpenFile() {
        this.importFileElement.nativeElement.click();
    }
}
