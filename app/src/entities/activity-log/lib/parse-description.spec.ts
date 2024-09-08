import { faker } from "@faker-js/faker";
import { TagToken } from "../models/description/tag-token";
import { TextToken } from "../models/description/text-token";
import { parseDescription, TAG_CHARACTER } from "./parse-description";

describe(parseDescription.name, () => {
    it("parses an empty string to an empty array", () => {
        expect(parseDescription("")).toEqual([]);
    });

    it("parses plain text", () => {
        const plainText = faker.word.words({ count: { min: 2, max: 20 } });
        expect(parseDescription(plainText))
            .withContext(plainText)
            .toEqual([new TextToken(plainText)]);
    });

    it("parses text with a token at the start", () => {
        const plainText = " " + faker.word.words({ count: { min: 2, max: 5 } });
        const tag = faker.word.noun();
        const combined = TAG_CHARACTER + tag + plainText;
        expect(parseDescription(combined))
            .withContext(combined)
            .toEqual([new TagToken(tag), new TextToken(plainText)]);
    });

    it("parses text with a token in the middle", () => {
        const plainTextBefore =
            faker.word.words({ count: { min: 2, max: 5 } }) + " ";
        const tag = faker.word.noun();
        const plainTextAfter =
            " " + faker.word.words({ count: { min: 2, max: 5 } });
        const combined = plainTextBefore + TAG_CHARACTER + tag + plainTextAfter;
        expect(parseDescription(combined))
            .withContext(combined)
            .toEqual([
                new TextToken(plainTextBefore),
                new TagToken(tag),
                new TextToken(plainTextAfter),
            ]);
    });

    it("parses text with a token at the end", () => {
        const plainText = faker.word.words({ count: { min: 2, max: 5 } }) + " ";
        const tag = faker.word.noun();
        const combined = plainText + TAG_CHARACTER + tag;
        expect(parseDescription(combined))
            .withContext(combined)
            .toEqual([new TextToken(plainText), new TagToken(tag)]);
    });

    it("parses text with only a single tag", () => {
        const tag = faker.word.noun();
        expect(parseDescription(TAG_CHARACTER + tag))
            .withContext(tag)
            .toEqual([new TagToken(tag)]);
    });

    it("ignores empty tag symbols", () => {
        const plainTextBefore =
            " " + faker.word.words({ count: { min: 2, max: 5 } }) + " ";
        const plainTextAfter =
            " " + faker.word.words({ count: { min: 2, max: 5 } });
        const combined =
            TAG_CHARACTER + plainTextBefore + TAG_CHARACTER + plainTextAfter;
        expect(parseDescription(combined))
            .withContext(combined)
            .toEqual([
                new TextToken(TAG_CHARACTER),
                new TextToken(plainTextBefore),
                new TextToken(TAG_CHARACTER),
                new TextToken(plainTextAfter),
            ]);
    });
});
