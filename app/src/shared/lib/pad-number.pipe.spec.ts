import { PadNumberPipe } from "./pad-number.pipe";

describe("PadNumberPipe", () => {
    it("create an instance", () => {
        const pipe = new PadNumberPipe();
        expect(pipe).toBeTruthy();
    });

    it("properly pad numbers", () => {
        const expectations = [
            {
                v: 2,
                l: 2,
                p: "0",
                r: "02",
            },
            {
                v: 12,
                l: 2,
                p: "0",
                r: "12",
            },
            {
                v: 123,
                l: 2,
                p: "0",
                r: "123",
            },
        ];

        const pipe = new PadNumberPipe();
        for (const expectation of expectations) {
            const value = expectation.v;
            const minLength = expectation.l;
            const padding = expectation.p;
            const expectedResult = expectation.r;
            const padded = pipe.transform(value, minLength, padding);
            expect(padded).withContext(`In: ${value}`).toBe(expectedResult);
        }
    });
});
