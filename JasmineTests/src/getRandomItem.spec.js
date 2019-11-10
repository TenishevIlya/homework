const getRandomItem = require('./getRandomItem')
describe("getRandomItem", function(){
	it("getRandomItem should return random array item",function() {
		var item = getRandomItem([1,2,3,4,5]);
        expect(item >= 1 && item <= 5).toBeTruthy();
    });
});