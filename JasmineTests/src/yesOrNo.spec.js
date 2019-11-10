const yesOrNo = require('./yesOrNo');
describe("yesOrNo", function () {
    it("sholud say yes", function() {
    	expect(yesOrNo(true)).toBe("yes");
    });
    it("sholud say no", function() {
    	expect(yesOrNo(false)).toBe("no");
    });
    it("should return null", function() {
    	expect(yesOrNo(null)).toBe(null);
    });
    it("should return null", function() {
    	expect(yesOrNo(undefined)).toBe(null);
    });
});
