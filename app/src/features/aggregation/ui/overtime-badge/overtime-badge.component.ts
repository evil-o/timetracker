import { Component, Input } from "@angular/core";

@Component({
    selector: "app-overtime-badge",
    templateUrl: "./overtime-badge.component.html",
    standalone: false,
})
export class OvertimeBadgeComponent {
    @Input() public hours?: number;

    public format = "{h}h {m}m";
}
