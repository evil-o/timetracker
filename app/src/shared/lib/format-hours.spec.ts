import { formatHours } from "./format-hours";

describe(formatHours.name, () => {
    it("formats minutes", () => {
        expect(formatHours(0.5)).toBe("0h 30m");
    });

    it("formats full hours", () => {
        expect(formatHours(1)).toBe("1h 00m");
    });

    it("formats hours and minutes", () => {
        expect(formatHours(1.5)).toBe("1h 30m");
    });
});
