const ALL_TAGS = document.querySelectorAll('*:not(.logo)');
const LANG = document.documentElement.lang;
let allTagsNeeded = [];
let dataNames = [];

let findTextElements = () => {
	for (let word of ALL_TAGS) {
		if (((!word.firstElementChild) && (word.textContent.length !== 0)) || (word.placeholder)){
			allTagsNeeded.push(word);	
		}
	}

}

findTextElements();

let setDataAttribute = (data,array) => {
	for (let elem of array) {
		for (let key in data) {
			if ((elem.textContent === data[key]) || (elem.placeholder === data[key])){
				elem.setAttribute('data-translate',key);
			}
		}
	}
}

function getTranslation(lang) {
	return fetch(`../script/${lang}.json`)
		.then((resp) => resp.json())
}

function replaceText(tags, translatesList) {
    for (let elem of tags) {
    	let keyWord = elem.getAttribute('data-translate');
        elem.textContent = translatesList[keyWord];
        if (elem.placeholder) {
        	elem.placeholder = translatesList[keyWord];
        }
    }
}

let addDataAttribute = () => {
	//ru.json т.к. в данном случае не имеет значения какой именно json мы выбираем
	fetch("../script/ru.json") 
    .then((resp) => {
	   	return resp.json();
	})
	.then((data) => {
		setDataAttribute(data,allTagsNeeded)
	})
}

addDataAttribute();

getTranslation(LANG).then(
	(data) => {
		replaceText(allTagsNeeded,data);
	}
);