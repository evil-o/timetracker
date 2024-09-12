import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { WeekSelectorComponent } from "./ui/week-selector.component";

const components = [WeekSelectorComponent];

@NgModule({
    declarations: [...components],
    exports: [...components],
    imports: [CommonModule],
})
export class WeekFeaturesModule {}
