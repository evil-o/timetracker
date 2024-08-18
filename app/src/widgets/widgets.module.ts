import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LegacyModule } from "../shared/legacy.module";
import { NavbarComponent } from "./navbar/navbar.component";

const declarations = [NavbarComponent];

@NgModule({
    declarations: [...declarations],
    exports: [...declarations],
    imports: [LegacyModule, CommonModule, RouterModule],
})
export class WidgetsModule {}
