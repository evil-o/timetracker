import { ComponentFixture, TestBed } from "@angular/core/testing";

import { By } from "@angular/platform-browser";

import { TimeBadgeComponent } from "./time-badge.component";
import { DebugElement } from "@angular/core";

describe("TimeBadgeComponent", () => {
    let component: TimeBadgeComponent;
    let fixture: ComponentFixture<TimeBadgeComponent>;

    let displaySpanDebug: DebugElement;
    let displaySpan: HTMLSpanElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TimeBadgeComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TimeBadgeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        displaySpanDebug = fixture.debugElement.query(By.css("span"));
        displaySpan = displaySpanDebug.nativeElement;
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should properly create time strings", async () => {
        const expectations = [
            { h: 16, m: 5, s: "16:05" },
            { h: 6, m: 5, s: "6:05" },
            { h: 8, m: 28, s: "8:28" },
        ];
        for (const e of expectations) {
            component.date = new Date(2018, 0, 22, e.h, e.m);

            fixture.detectChanges();

            expect(component.dateDisplayString).toBe(e.s);
            expect(displaySpan.innerHTML).toContain(
                component.dateDisplayString
            );
        }
    });
});
