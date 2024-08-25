import { Component, Input } from "@angular/core";

@Component({
    selector: "app-overtime-badge",
    templateUrl: "./overtime-badge.component.html",
})
export class OvertimeBadgeComponent {
    public format = "{h}h {m}m";

    @Input() hours?: number;
}
