import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { LegacyModule } from "../../shared/legacy.module";
import { ActivityLogListComponent } from "./ui/activity-log-list/actvity-log-list.component";

const declarations = [ActivityLogListComponent];

@NgModule({
    declarations: [...declarations],
    exports: [...declarations],
    imports: [LegacyModule, AccordionModule, CommonModule],
})
export class ActivityLogWidgetsModule {}
