import { faker } from "@faker-js/faker";
import { byTestId, createComponentFactory, Spectator } from "@ngneat/spectator";
import { EntryDescriptionComponent } from "./entry-description.component";

describe(EntryDescriptionComponent.name, () => {
    const create = createComponentFactory({
        component: EntryDescriptionComponent,
        shallow: true,
    });
    let spectator: Spectator<EntryDescriptionComponent>;

    it("renders text and tags", () => {
        const text = faker.word.words({ count: { min: 2, max: 5 } });
        const tag = faker.word.noun();
        const combined = text + " #" + tag;
        spectator = create({ props: { description: combined } });
        const textToken = spectator.query(byTestId("text-token"));
        const tagToken = spectator.query(byTestId("tag-token"));
        expect(textToken).toHaveText(text);
        expect(tagToken).toHaveText(tag);
    });
});
