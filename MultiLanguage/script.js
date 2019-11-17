let allTags = document.querySelectorAll('*');

let checkLanguage = () => {
	if (document.documentElement.lang === "en") {
		return "en";
	}
	else {
		return "ru";
	}
}

let findElementsWithText = (elementsList) => {
	for (let child of allTags) {
		if (!child.firstElementChild) {
			elementsList.push(child);	
		}	
	}
	return elementsList;	
}

let array = [];
console.log(true);