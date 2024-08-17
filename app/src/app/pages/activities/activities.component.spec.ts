import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { ModalModule } from "ngx-bootstrap/modal";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { ActivityColorPickerComponent } from "../../components/activity-color-picker/activity-color-picker.component";
import { ActivityPickerComponent } from "../../components/activity-picker/activity-picker.component";
import { ActivityTypeListComponent } from "../../components/activity-type-list/activity-type-list.component";
import { ActivitiesComponent } from "./activities.component";

describe("ActivitiesComponent", () => {
    let component: ActivitiesComponent;
    let fixture: ComponentFixture<ActivitiesComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ActivityColorPickerComponent,
                ActivityPickerComponent,
                ActivitiesComponent,
                ActivityTypeListComponent,
            ],
            imports: [
                FormsModule,
                ModalModule.forRoot(),
                StoreModule.forRoot(),
                TypeaheadModule.forRoot(),
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
