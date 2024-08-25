import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { ModalModule } from "ngx-bootstrap/modal";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { ActivityPickerComponent } from "../../entities/activity-types/ui";
import { ActivityColorPickerComponent } from "../../features/activity-color";
import { FeaturesModule } from "../../features/features.module";
import { WidgetsModule } from "../../widgets/widgets.module";
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

                FeaturesModule,
                WidgetsModule,
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
