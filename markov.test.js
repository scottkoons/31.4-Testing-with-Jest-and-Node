const { MarkovMachine } = require("./markov");

describe("build and run Markov Machine", () => {
    test("test chain function", () => {
        let mm = new MarkovMachine("one two three one three four");

        expect(mm.chains).toEqual(
            new Map([
                ["one", ["two", "three"]],
                ["two", ["three"]],
                ["three", ["one", "four"]],
                ["four", [null]],
            ])
        );
    });

    test("choice picks from array", () => {
        expect(MarkovMachine.choice([1, 1, 1, 1])).toEqual(1);
        expect([1, 2, 3, 4]).toContain(MarkovMachine.choice([1, 2, 3]));
    });

    test("generates semi predictable text", () => {
        let mm = new MarkovMachine("a b c");
        let text = mm.makeText();
        expect(["a b c", "b c", "c"]).toContain(text);
    });
});