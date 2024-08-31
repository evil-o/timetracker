import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { FormatHoursPipe, PrecisionPipe } from "../../../../shared/lib";
import { OvertimeBadgeComponent } from "./overtime-badge.component";

describe(OvertimeBadgeComponent.name, () => {
    const create = createComponentFactory({
        component: OvertimeBadgeComponent,
        // TODO: don't depend on the pipes directly here
        declarations: [PrecisionPipe, FormatHoursPipe],
    });
    let spectator: Spectator<OvertimeBadgeComponent>;
    let component: OvertimeBadgeComponent;
    let span: HTMLElement;

    function reQuery(): void {
        spectator.detectChanges();

        span = spectator.query("span") as HTMLElement;
    }

    beforeEach(() => {
        spectator = create();
        component = spectator.component;
        reQuery();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("contains a success badge for positive hours", () => {
        component.hours = 1;
        reQuery();

        expect(span).toHaveClass("badge");
        expect(span).toHaveClass("bg-success");
        expect(span).toContainText("+1");
    });

    it("contains a danger badge for negative hours", () => {
        component.hours = -1;
        reQuery();

        expect(span).toHaveClass("badge");
        expect(span).toHaveClass("bg-danger");
        expect(span).toContainText("-1");
    });

    it('shows "-" for undefined hours', () => {
        component.hours = undefined;
        reQuery();

        expect(span).not.toHaveClass("badge");
        expect(span).toContainText("-");
    });

    it("contains a neutral badge for near-zero hours", () => {
        component.hours = 0.000001;
        reQuery();

        expect(span).toHaveClass("badge");
        expect(span).toHaveClass("bg-secondary");
        expect(span).toContainText("0");
    });
});
