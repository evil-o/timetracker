import { Component, output } from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";

@Component({
    selector: "app-modal-header",
    templateUrl: "./modal-header.component.html",
})
export class ModalHeaderComponent {
    public onDismiss = output<void>();

    public constructor(private modalService: BsModalService) {}

    public dismiss(): void {
        this.onDismiss.emit();
        this.modalService.hide();
    }
}
