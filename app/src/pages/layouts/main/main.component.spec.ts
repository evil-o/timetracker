import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { FormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TabsModule } from "ngx-bootstrap/tabs";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { appRoutes } from "../../../app/app.routes";
import { EditableLogEntryDescriptionComponent } from "../../../entities/activity-log/ui/editable-log-entry-description/editable-log-entry-description.component";
import { EditableLogEntryHoursComponent } from "../../../entities/activity-log/ui/editable-log-entry-hours/editable-log-entry-hours.component";
import { ActivityTypesModule } from "../../../entities/activity-type/activity-types.module";
import { metaReducers } from "../../../entities/application/meta-reducers";
import { reducers } from "../../../entities/application/reducers";
import { AcivityColorFeaturesModule } from "../../../features/activity-color/activity-color-features.module";
import { ActivityLogEntryComponent } from "../../../features/activity-log/ui/activity-log-entry/activity-log-entry.component";
import { FormatHoursPipe } from "../../../shared";
import { DayAttendanceComponent } from "../../../shared/legacy/day-attendance/day-attendance.component";
import { HourBadgeComponent } from "../../../shared/legacy/hour-badge/hour-badge.component";
import { NoActivityLogEntryPresentComponent } from "../../../shared/legacy/no-activity-log-entry-present/no-activity-log-entry-present.component";
import { OvertimeBadgeComponent } from "../../../shared/legacy/overtime-badge/overtime-badge.component";
import { ActivityTypeIdToNamePipe } from "../../../shared/legacy/pipes/activity-type-id-to-name.pipe";
import { GroupActivityLogEntriesByIdPipe } from "../../../shared/legacy/pipes/group-activity-log-entries-by-id.pipe";
import { LogEntryTallyPipe } from "../../../shared/legacy/pipes/log-entry-tally.pipe";
import { PrecisionPipe } from "../../../shared/legacy/pipes/precision.pipe";
import { TimeBadgeComponent } from "../../../shared/legacy/time-badge/time-badge.component";
import { SharedModule } from "../../../shared/shared.module";
import { ActivityLogListComponent } from "../../../widgets/activity-log/ui/activity-log-list/actvity-log-list.component";
import { TallyComponent } from "../../../widgets/activity-log/ui/tally/tally.component";
import { NavbarComponent } from "../../../widgets/navigation";
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
                ActivityTypeIdToNamePipe,
                ActivityLogEntryComponent,
                ActivityLogListComponent,
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
                PrecisionPipe,
                TallyComponent,
                TimeBadgeComponent,
                WeekComponent,
                WelcomeComponent,
            ],
            imports: [
                AccordionModule,
                ActivityTypesModule,
                AcivityColorFeaturesModule,
                BsDatepickerModule.forRoot(),
                FormsModule,
                StoreModule.forRoot(reducers, { metaReducers }),
                TabsModule,
                TypeaheadModule.forRoot(),
                RouterTestingModule.withRoutes(appRoutes),
                SharedModule,
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
