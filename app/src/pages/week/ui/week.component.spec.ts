import { ActivatedRoute } from "@angular/router";
import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { provideMockStore } from "@ngrx/store/testing";
import { MockPipes, MockProvider } from "ng-mocks";
import { BsModalService } from "ngx-bootstrap/modal";
import { of } from "rxjs";
import {
    ActivityLog,
    GroupActivityLogEntriesByIdPipe,
} from "../../../entities/activity-log";
import { ActivityTypes } from "../../../entities/activity-type";
import { ApplicationState } from "../../../entities/application";
import { AttendanceState } from "../../../entities/attendance";
import { ConfigurationState } from "../../../entities/configuration";
import { FormatHoursPipe } from "../../../shared/lib";
import { WeekComponent } from "./week.component";

describe(WeekComponent.name, () => {
    const create = createComponentFactory({
        component: WeekComponent,
        shallow: true,
        providers: [
            {
                provide: ActivatedRoute,
                useValue: { queryParams: of({ year: 2018, week: 1 }) },
            },
            MockProvider(BsModalService),
            ...provideMockStore<Partial<ApplicationState>>({
                initialState: {
                    activityTypes: new ActivityTypes(),
                    activityLog: new ActivityLog(),
                    attendanceState: new AttendanceState(),
                    configuration: new ConfigurationState(),
                },
            }),
        ],
        declarations: [
            MockPipes(FormatHoursPipe, GroupActivityLogEntriesByIdPipe),
        ],
    });
    let spectator: Spectator<WeekComponent>;
    let component: WeekComponent;

    beforeEach(() => {
        spectator = create();
        component = spectator.component;
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
