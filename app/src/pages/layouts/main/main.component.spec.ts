import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { FormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TabsModule } from "ngx-bootstrap/tabs";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { appRoutes } from "../../../app/app.routes";
import { metaReducers } from "../../../entities/application/meta-reducers";
import { reducers } from "../../../entities/application/reducers";
import { ActivityColorPickerComponent } from "../../../shared/legacy/activity-color-picker/activity-color-picker.component";
import { ActivityLogEntryComponent } from "../../../shared/legacy/activity-log-entry/activity-log-entry.component";
import { ActivityPickerComponent } from "../../../shared/legacy/activity-picker/activity-picker.component";
import { ActivityTypeListComponent } from "../../../shared/legacy/activity-type-list/activity-type-list.component";
import { ActivityLogListComponent } from "../../../shared/legacy/actvity-log-list/actvity-log-list.component";
import { DayAttendanceComponent } from "../../../shared/legacy/day-attendance/day-attendance.component";
import { EditableLogEntryDescriptionComponent } from "../../../shared/legacy/editable-log-entry-description/editable-log-entry-description.component";
import { EditableLogEntryHoursComponent } from "../../../shared/legacy/editable-log-entry-hours/editable-log-entry-hours.component";
import { HourBadgeComponent } from "../../../shared/legacy/hour-badge/hour-badge.component";
import { NoActivityLogEntryPresentComponent } from "../../../shared/legacy/no-activity-log-entry-present/no-activity-log-entry-present.component";
import { OvertimeBadgeComponent } from "../../../shared/legacy/overtime-badge/overtime-badge.component";
import { ActivityTypeIdToNamePipe } from "../../../shared/legacy/pipes/activity-type-id-to-name.pipe";
import { FormatHoursPipe } from "../../../shared/legacy/pipes/format-hours.pipe";
import { GroupActivityLogEntriesByIdPipe } from "../../../shared/legacy/pipes/group-activity-log-entries-by-id.pipe";
import { LogEntryTallyPipe } from "../../../shared/legacy/pipes/log-entry-tally.pipe";
import { PadNumberPipe } from "../../../shared/legacy/pipes/pad-number.pipe";
import { PrecisionPipe } from "../../../shared/legacy/pipes/precision.pipe";
import { TallyComponent } from "../../../shared/legacy/tally/tally.component";
import { TimeBadgeComponent } from "../../../shared/legacy/time-badge/time-badge.component";
import { NavbarComponent } from "../../../widgets/navbar/navbar.component";
import { ActivitiesComponent } from "../../activities/activities.component";
import { ConfigurationComponent } from "../../configuration/configuration.component";
import { DayComponent } from "../../day/day.component";
import { WeekComponent } from "../../week/week.component";
import { WelcomeComponent } from "../../welcome/welcome.component";
import { MainComponent } from "./main.component";

describe(MainComponent.name, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ActivitiesComponent,
                ActivityColorPickerComponent,
                ActivityTypeIdToNamePipe,
                ActivityLogEntryComponent,
                ActivityLogListComponent,
                ActivityPickerComponent,
                ActivityTypeListComponent,
                MainComponent,
                ConfigurationComponent,
                DayComponent,
                DayAttendanceComponent,
                EditableLogEntryDescriptionComponent,
                EditableLogEntryHoursComponent,
                FormatHoursPipe,
                GroupActivityLogEntriesByIdPipe,
                HourBadgeComponent,
                LogEntryTallyPipe,
                NavbarComponent,
                NoActivityLogEntryPresentComponent,
                OvertimeBadgeComponent,
                PadNumberPipe,
                PrecisionPipe,
                TallyComponent,
                TimeBadgeComponent,
                WeekComponent,
                WelcomeComponent,
            ],
            imports: [
                AccordionModule,
                BsDatepickerModule.forRoot(),
                FormsModule,
                StoreModule.forRoot(reducers, { metaReducers }),
                TabsModule,
                TypeaheadModule.forRoot(),
                RouterTestingModule.withRoutes(appRoutes),
            ],
        }).compileComponents();
    });
    it("should create the app", () => {
        const fixture = TestBed.createComponent(MainComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
    /*
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));
  */
});
