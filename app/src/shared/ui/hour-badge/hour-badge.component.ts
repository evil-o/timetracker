import { Component, Input } from "@angular/core";

@Component({
    selector: "app-hour-badge",
    templateUrl: "./hour-badge.component.html",
})
export class HourBadgeComponent {
    @Input() public hours: number | undefined | null;
}
