import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StoreModule } from "@ngrx/store";
import { EditableLogEntryDescriptionComponent } from "../../../../entities/activity-log/ui/editable-log-entry-description/editable-log-entry-description.component";
import { EditableLogEntryHoursComponent } from "../../../../entities/activity-log/ui/editable-log-entry-hours/editable-log-entry-hours.component";
import { ActivityLogEntryComponent } from "../../../../features/activity-log/ui/activity-log-entry/activity-log-entry.component";
import { HourBadgeComponent } from "../../../../shared/legacy/hour-badge/hour-badge.component";
import { NoActivityLogEntryPresentComponent } from "../../../../shared/legacy/no-activity-log-entry-present/no-activity-log-entry-present.component";
import { TallyComponent } from "./tally.component";

import { AccordionModule } from "ngx-bootstrap/accordion";
import { LogEntryTallyPipe } from "../../../../entities/activity-log";
import { ActivityTypeIdToNamePipe } from "../../../../entities/activity-type/lib/activity-type-id-to-name.pipe";
import { metaReducers } from "../../../../entities/application/meta-reducers";
import { reducers } from "../../../../entities/application/reducers";
import { FormatHoursPipe } from "../../../../shared";

describe("TallyComponent", () => {
    let component: TallyComponent;
    let fixture: ComponentFixture<TallyComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ActivityLogEntryComponent,
                ActivityTypeIdToNamePipe,
                EditableLogEntryDescriptionComponent,
                EditableLogEntryHoursComponent,
                FormatHoursPipe,
                HourBadgeComponent,
                TallyComponent,
                LogEntryTallyPipe,
                NoActivityLogEntryPresentComponent,
            ],
            imports: [
                AccordionModule.forRoot(),
                StoreModule.forRoot(reducers, { metaReducers }),
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TallyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
