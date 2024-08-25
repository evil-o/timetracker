import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideNoopAnimations } from "@angular/platform-browser/animations";
import { StoreModule } from "@ngrx/store";
import { AccordionModule } from "ngx-bootstrap/accordion";
import {
    EditableLogEntryDescriptionComponent,
    EditableLogEntryHoursComponent,
} from "../../../../entities/activity-log";
import { ActivityTypeIdToNamePipe } from "../../../../entities/activity-type";
import { metaReducers } from "../../../../entities/application/meta-reducers";
import { reducers } from "../../../../entities/application/reducers";
import { FormatHoursPipe } from "../../../../shared/lib";
import { HourBadgeComponent } from "../../../../shared/ui";
import { ActivityLogEntryComponent } from "./activity-log-entry.component";

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
