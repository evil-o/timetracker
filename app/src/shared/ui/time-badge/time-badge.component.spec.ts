import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { TimeBadgeComponent } from "./time-badge.component";

describe(TimeBadgeComponent.name, () => {
    const create = createComponentFactory({
        component: TimeBadgeComponent,
        shallow: true,
    });
    let spectator: Spectator<TimeBadgeComponent>;

    let displaySpan: HTMLSpanElement;

    beforeEach(() => {
        spectator = create();

        displaySpan = spectator.query("span") as HTMLSpanElement;
    });

    it("should create", () => {
        expect(spectator.component).toBeTruthy();
    });

    it("should properly create time strings", async () => {
        const expectations = [
            { h: 16, m: 5, s: "16:05" },
            { h: 6, m: 5, s: "6:05" },
            { h: 8, m: 28, s: "8:28" },
        ];
        for (const e of expectations) {
            spectator.component.date = new Date(2018, 0, 22, e.h, e.m);

            spectator.detectChanges();

            expect(spectator.component.dateDisplayString).toBe(e.s);
            expect(displaySpan.innerHTML).toContain(
                spectator.component.dateDisplayString
            );
        }
    });
});
