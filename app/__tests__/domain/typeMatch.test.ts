describe("型検証", () => {
    // Class の他に、Interface, Type で書ける
    class Target {
        a: boolean = true;
        b: string = "string";
    }
    // interface Target {
    //     a: boolean;
    //     b: string;
    // }
    // type Target = {
    //     a: boolean;
    //     b: string;
    // }
    describe("structure match", () => {
        const isTarget = (arg: unknown): arg is Target =>
            typeof arg === "object" &&
            arg !== null &&
            typeof (arg as Target).a === "boolean" &&
            typeof (arg as Target).b === "string";
        describe("valid", () => {
            const validObj = {
                a: true,
                b: "hoge",
            };
            const returnTarget = (target: Target): Target => target;
            it("instanceof(Target が Class の場合には、コンパイルエラーとなる)", () => {
                expect(returnTarget(validObj) instanceof Target).toBeFalsy();
            });
            it("guard", () => {
                expect(isTarget(validObj)).toBeTruthy();
            });
        });
        describe("invalid", () => {
            const invalidObj = {
                a: true,
                c: "fuga",
            };
            it("instanceof(Target が Class の場合には、コンパイルエラーとなる)", () => {
                expect(invalidObj instanceof Target).toBeFalsy();
            });
            it("guard", () => {
                expect(isTarget(invalidObj)).toBeFalsy();
            });
        });
        describe("extended", () => {
            const extendedValidObj = {
                a: true,
                b: "hoge",
                c: "fuga",
            };
            it("instanceof(Target が Class の場合には、コンパイルエラーとなる)", () => {
                expect(extendedValidObj instanceof Target).toBeFalsy();
            });
            it("guard", () => {
                expect(isTarget(extendedValidObj)).toBeTruthy();
            });
        });
    });
});
