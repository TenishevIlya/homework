class Calculation {
	constructor(date){
		this.date = date;
	}

	calculateAge() {
    	if ((this.date !== null) && (this.date !== undefined) && (this.date.getTime() < Date.now())) {
      		let ageDifMs = Date.now() - this.date.getTime();
      		let ageDate = new Date(ageDifMs);
      		return Math.abs(ageDate.getUTCFullYear() - 1970);
    	}
    	else {
      		return null;  
    	}
	}

	show() {
		firstResult.append('Age: ' + this.calculateAge());
	}
}

let myCalculation = new Calculation(new Date(1999,8,22));
myCalculation.show();

