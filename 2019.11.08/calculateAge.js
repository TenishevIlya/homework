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
}


class AgeShow {
	constructor(age) {
		this.age = age;
	}

	show() {
		console.log(this.age);
	}
}

let myCalculation = new Calculation(new Date(1999,8,22));

let myAge = new AgeShow(myCalculation.calculateAge());
myAge.show();

