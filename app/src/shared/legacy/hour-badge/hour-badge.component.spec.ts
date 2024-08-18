import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FormatHoursPipe } from "../pipes/format-hours.pipe";
import { HourBadgeComponent } from "./hour-badge.component";

describe("HourBadgeComponent", () => {
    let component: HourBadgeComponent;
    let fixture: ComponentFixture<HourBadgeComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FormatHoursPipe, HourBadgeComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HourBadgeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
