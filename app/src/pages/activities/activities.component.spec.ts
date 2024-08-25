import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { ModalModule } from "ngx-bootstrap/modal";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { ActivityPickerComponent } from "../../entities/activity-type/ui";
import { ActivityColorPickerComponent } from "../../features/activity-color";
import { AcivityColorFeaturesModule } from "../../features/activity-color/activity-color-features.module";
import { ActivityTypesListWidgetsModule } from "../../widgets/activity-types-list/activity-types-list-widgets.module";
import { ActivitiesComponent } from "./activities.component";

describe(ActivitiesComponent.name, () => {
    let component: ActivitiesComponent;
    let fixture: ComponentFixture<ActivitiesComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ActivityColorPickerComponent,
                ActivityPickerComponent,
                ActivitiesComponent,
            ],
            imports: [
                FormsModule,
                ModalModule.forRoot(),
                StoreModule.forRoot(),
                TypeaheadModule.forRoot(),

                AcivityColorFeaturesModule,
                ActivityTypesListWidgetsModule,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ActivitiesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
