import { getWeek } from "./get-week";

fdescribe(getWeek.name, () => {
    it("returns the right week for a few examples", () => {
        expect(getWeek(new Date(2025, 0, 1))).toBe(1);
        expect(getWeek(new Date(2025, 8, 2))).toBe(36);
        expect(getWeek(new Date(2025, 11, 24))).toBe(52);
    });
});
