import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StoreModule } from "@ngrx/store";
import { AccordionModule } from "ngx-bootstrap/accordion";
import {
    EditableLogEntryDescriptionComponent,
    EditableLogEntryHoursComponent,
    NoActivityLogEntryPresentComponent,
} from "../../../../entities/activity-log";
import { ActivityTypeIdToNamePipe } from "../../../../entities/activity-type";
import { metaReducers } from "../../../../entities/application/meta-reducers";
import { reducers } from "../../../../entities/application/reducers";
import { ActivityLogEntryComponent } from "../../../../features/activity-log";
import { FormatHoursPipe } from "../../../../shared/lib";
import { HourBadgeComponent } from "../../../../shared/ui";
import { TallyComponent } from "./tally.component";

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
