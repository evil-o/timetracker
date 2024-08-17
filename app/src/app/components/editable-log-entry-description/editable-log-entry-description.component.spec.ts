import { Component, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EditableLogEntryDescriptionComponent } from "./editable-log-entry-description.component";

@Component({
    selector: `app-test-host-component`,
    template: `<app-editable-log-entry-description></app-editable-log-entry-description>`,
})
class TestHostComponent {
    @ViewChild(EditableLogEntryDescriptionComponent)
    public component!: EditableLogEntryDescriptionComponent;
}

describe("EditableLogEntryDescriptionComponent", () => {
    let host: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                EditableLogEntryDescriptionComponent,
                TestHostComponent,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        host = fixture.componentInstance;
        host.component.entry = {
            actvitiyId: "testActivity",
            day: 13,
            month: 0,
            year: 2018,
            description: "test description",
            hours: 6,
            id: "testId",
        };
        fixture.detectChanges();
    });

    xit("should create", () => {
        expect(host).toBeTruthy();
    });
});
