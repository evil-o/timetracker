import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { FormatHoursPipe } from "../pipes/format-hours.pipe";
import { PrecisionPipe } from "../pipes/precision.pipe";
import { OvertimeBadgeComponent } from "./overtime-badge.component";

describe("OvertimeBadgeComponent", () => {
    let component: OvertimeBadgeComponent;
    let fixture: ComponentFixture<OvertimeBadgeComponent>;
    let span: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                FormatHoursPipe,
                OvertimeBadgeComponent,
                PrecisionPipe,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OvertimeBadgeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should contain a success badge for positive hours", () => {
        component.hours = 1;

        fixture.detectChanges();
        span = fixture.debugElement.query(By.css(".badge"));
        expect(span).toBeTruthy();
        span = fixture.debugElement.query(By.css(".bg-success"));

        expect(span).toBeTruthy();
        expect(span.nativeElement.innerText).toContain("+1");
    });

    it("should contain a danger badge for negative hours", () => {
        component.hours = -1;

        fixture.detectChanges();
        span = fixture.debugElement.query(By.css(".badge"));
        expect(span).toBeTruthy();
        span = fixture.debugElement.query(By.css(".bg-danger"));

        expect(span).toBeTruthy();
        expect(span.nativeElement.innerText).toContain("-1");
    });

    it('should show "-" for undefined hours', () => {
        component.hours = undefined;

        fixture.detectChanges();
        span = fixture.debugElement.query(By.css(".badge"));
        expect(span).toBeFalsy();

        span = fixture.debugElement.query(By.css("span"));
        expect(span).toBeTruthy();

        expect(span.nativeElement.innerText).toContain("-");
    });

    it("should contain a neutral badge for near-zero hours", () => {
        component.hours = 0.000001;

        fixture.detectChanges();
        span = fixture.debugElement.query(By.css(".badge"));
        expect(span).toBeTruthy();

        span = fixture.debugElement.query(By.css(".bg-secondary"));
        expect(span).toBeTruthy();

        expect(span.nativeElement.innerText).toContain("0");
    });
});
