import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NO_ERRORS_SCHEMA } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { StopwatchComponent } from "./stopwatch.component";

describe(StopwatchComponent.name, () => {
    let component: StopwatchComponent;
    let fixture: ComponentFixture<StopwatchComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [StopwatchComponent],
            imports: [StoreModule.forRoot()],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StopwatchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
