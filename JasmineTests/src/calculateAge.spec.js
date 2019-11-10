const calculateAge = require('./calculateAge')
describe("calculateAge", function(){
	it("calculateAge should return 28", function(){
        expect(calculateAge(new Date(1990,12,12))).toEqual(28);

    });
    it("calculateAge should return 20", function(){
        expect(calculateAge(new Date(1999,8,22))).toEqual(20);
    });
    it("calculateAge should return null", function(){
        expect(calculateAge(new Date(2039, 1, 12))).toEqual(null);
    });
    it("calculateAge should return null", function(){
        expect(calculateAge(null)).toBe(null);
    });
    it("calculateAge should return null", function(){
        expect(calculateAge(undefined)).toBe(null);
    });
});