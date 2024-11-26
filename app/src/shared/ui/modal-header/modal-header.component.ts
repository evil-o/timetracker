import { Component, output } from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";

@Component({
    selector: "app-modal-header",
    templateUrl: "./modal-header.component.html",
})
export class ModalHeaderComponent {
    public dismissed = output<void>();

    public constructor(private modalService: BsModalService) {}

    public dismiss(): void {
        this.dismissed.emit();
        this.modalService.hide();
    }
}
