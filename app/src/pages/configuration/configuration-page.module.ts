import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ConfigurationComponent } from "./ui/configuration.component";

@NgModule({
    declarations: [ConfigurationComponent],
    exports: [ConfigurationComponent],
    imports: [CommonModule],
})
export class ConfigurationPageModule {}
