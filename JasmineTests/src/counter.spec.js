const counter = require('./counter')
describe("Counter", function(){
    it("should return 4 as it less than 9", function(){
        expect(counter(4)).toEqual(4);  
    });
    it("should return 9 as it equal to 9", function(){
        expect(counter(9)).toBe(9); 
    });
    it("should return 9+ as it more than 9", function(){
        expect(counter(141)).toEqual("9+"); 
    });
    it("should return total is less than 1 as it less than 1", function(){
        expect(counter(0)).toBe("total is less than 1");  
    });
    it("should return null as it null", function(){
        expect(counter(null)).toBe(null);   
    });
    it("should return null as it not defined", function(){
        expect(counter(undefined)).toBe(null);   
    });
});