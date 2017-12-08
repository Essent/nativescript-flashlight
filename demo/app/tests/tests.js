var Flashlight = require("nativescript-flashlight").Flashlight;
var flashlight = new Flashlight();

describe("greet function", function() {
    it("exists", function() {
        expect(flashlight.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(flashlight.greet()).toEqual("Hello, NS");
    });
});