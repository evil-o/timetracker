import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StoreModule } from "@ngrx/store";
import { ActivityColorFeatureModule } from "../../../features/activity-color/activity-color-feature.module";
import { ActivityTypeListComponent } from "./activity-type-list.component";

describe("ActivityTypeListComponent", () => {
    let component: ActivityTypeListComponent;
    let fixture: ComponentFixture<ActivityTypeListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ActivityTypeListComponent],
            imports: [StoreModule.forRoot(), ActivityColorFeatureModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ActivityTypeListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
