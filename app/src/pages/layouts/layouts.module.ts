import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NavigationWidgetsModule } from "../../widgets/navigation";
import { MainComponent } from "./ui/main.component";

@NgModule({
    declarations: [MainComponent],
    exports: [MainComponent],
    imports: [CommonModule, RouterModule, NavigationWidgetsModule],
})
export class LayoutsModule {}
