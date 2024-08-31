import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { WelcomeComponent } from "./ui/welcome.component";

@NgModule({
    declarations: [WelcomeComponent],
    exports: [WelcomeComponent],
    imports: [CommonModule],
})
export class WelcomePageModule {}
