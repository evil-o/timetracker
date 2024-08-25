import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EditableLogEntryDescriptionComponent } from "../../../../entities/activity-log/ui/editable-log-entry-description/editable-log-entry-description.component";
import { EditableLogEntryHoursComponent } from "../../../../entities/activity-log/ui/editable-log-entry-hours/editable-log-entry-hours.component";
import { HourBadgeComponent } from "../../../../shared/ui/hour-badge/hour-badge.component";
import { ActivityLogEntryComponent } from "./activity-log-entry.component";

import { provideNoopAnimations } from "@angular/platform-browser/animations";
import { StoreModule } from "@ngrx/store";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { ActivityTypeIdToNamePipe } from "../../../../entities/activity-type/lib/activity-type-id-to-name.pipe";
import { metaReducers } from "../../../../entities/application/meta-reducers";
import { reducers } from "../../../../entities/application/reducers";
import { FormatHoursPipe } from "../../../../shared";

describe("ActivityLogEntryComponent", () => {
    let component: ActivityLogEntryComponent;
    let fixture: ComponentFixture<ActivityLogEntryComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ActivityLogEntryComponent,
                ActivityTypeIdToNamePipe,
                FormatHoursPipe,
                HourBadgeComponent,
                EditableLogEntryDescriptionComponent,
                EditableLogEntryHoursComponent,
            ],
            imports: [
                AccordionModule.forRoot(),
                StoreModule.forRoot(reducers, { metaReducers }),
            ],
            providers: [provideNoopAnimations()],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ActivityLogEntryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
