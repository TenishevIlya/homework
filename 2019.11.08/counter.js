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
      			return "";
    		}
  		}
  		if ((this.total === null) || (this.total === undefined)) {
    		return null;
  		}
	}

  show() {
    secondResult.append('Total: ' + this.counter());
  }
}

let count = new Counter(10102);
count.show();