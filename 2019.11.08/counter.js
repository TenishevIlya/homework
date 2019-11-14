class Counter {
	constructor(total) {
		this.total = total;
	}

	counter() {
  		if (Number.isInteger(this.total)) {
    		if ((this.total >= 1) && (this.total <= 9)) {
      			return this.total;
    		}
    		if (this.total > 9) {
      			return "9+";
    		}
   			else {
      			return "total is less than 1";
    		}
  		}
  		if ((this.total === null) || (this.total === undefined)) {
    		return null;
  		}
	}
}

class CounterResultsShow {
	constructor(result) {
		this.result = result;
	}

	show() {
		console.log(this.result);
	}
}

let count = new Counter(10102);

let res = new CounterResultsShow(count.counter());
res.show();