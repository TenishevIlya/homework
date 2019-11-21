let btn = document.getElementById('toggleBtn');
let myPopup = document.getElementById('popUp');
let modalFlag = false;

let getHorizontalShift = (element,popupEl) => {
	return (popupEl.offsetWidth - element.offsetWidth)/2;
}

let getVerticalShift = (element,popupEl) => {
	return (popupEl.offsetHeight - element.offsetHeight)/2;	
}

let getWindowHeight = () => {
    return window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
}

let getWindowWidth = () => {
    return window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
}

let getCoordinates = (element) => {
	let coords = [];
	coords.push(element.getBoundingClientRect().top);
	coords.push(element.getBoundingClientRect().left);
	return coords;
}

let showPopup = (element) => {
	element.style.display = "block";	
}

let outputVerticalExtraCases = (element,popupEl,btnCoords) => {
	if (popupEl.getBoundingClientRect().left < 0) {
		popupEl.style.left = btnCoords[1] + 'px';	
	}
	if (popupEl.getBoundingClientRect().right > getWindowWidth()) {
		popupEl.style.left = getWindowWidth() - popupEl.offsetWidth + 'px';	
	}	
}

let outputHorizontalExtraCases = (element,popupEl,btnCoords) => {
	if (popupEl.getBoundingClientRect().bottom > getWindowHeight()) {
		popupEl.style.top = getWindowHeight() - popupEl.offsetHeight - element.offsetHeight + 'px';
	}
	if (popupEl.getBoundingClientRect().top < 0) {
		popupEl.style.top = (getWindowHeight() - popupEl.offsetHeight) / 2 +'px';
	}
}

let outputPopupDown = (element,popupEl,btnCoords) => {
	let shift = getHorizontalShift(element,popupEl);
	popupEl.style.top = btnCoords[0] + element.offsetHeight + 10 +'px';
	popupEl.style.left = btnCoords[1] - shift + 'px';
	outputVerticalExtraCases(element,popupEl,btnCoords);
}

let outputPopupLeft = (element,popupEl,btnCoords) => {
	let shift = getVerticalShift(element,popupEl);
	popupEl.style.top = btnCoords[0] - shift +'px';
	popupEl.style.left = btnCoords[1] - popupEl.offsetWidth - 10 +'px';
	outputHorizontalExtraCases(element,popupEl,btnCoords);		
}

let outputPopupUp = (element,popupEl,btnCoords) => {
	let shift = getHorizontalShift(element,popupEl);
	popupEl.style.top = btnCoords[0] - popupEl.offsetHeight - 10 +'px';
	popupEl.style.left = btnCoords[1] - shift + 'px';
	outputVerticalExtraCases(element,popupEl,btnCoords);
}


let outputPopupRight = (element,popupEl,btnCoords) => {
	let shift = getVerticalShift(element,popupEl);
	popupEl.style.top = btnCoords[0] - shift +'px';
	popupEl.style.left = btnCoords[1] + element.offsetWidth + 10 +'px';
	outputHorizontalExtraCases(element,popupEl,btnCoords);
}

let outputPopupAsModal = (popupEl) => {
	popupEl.classList.add("modal");
	popupEl.style.height = popupEl.offsetHeight/2+'px';
	popupEl.style.top = (getWindowHeight() - popupEl.offsetHeight) / 2 + 'px';
	popupEl.style.left = (getWindowWidth() - popupEl.offsetWidth) / 2 + 'px';
}

let validateBottomOutput = (element,popupEl) => {
	let elementTopLeftCoords = getCoordinates(element);
	let shift = getHorizontalShift(element,popupEl);
	if ((elementTopLeftCoords[0] + element.offsetHeight + 10 + popupEl.offsetHeight) < getWindowHeight()) {
		return true;
	}
}

let validateLeftOutput = (element,popupEl) => {
	let elementTopLeftCoords = getCoordinates(element);
	let shift = getVerticalShift(element,popupEl);
	if (validatePopupHeight(popupEl) && (((elementTopLeftCoords[1] - popupEl.offsetWidth - 10) < elementTopLeftCoords[1]) &&
		(elementTopLeftCoords[1] - popupEl.offsetWidth - 10) > 0)) {
		return true;
	}	
}

let validateTopOutput = (element,popupEl) => {
	let elementTopLeftCoords = getCoordinates(element);
	let shift = getHorizontalShift(element,popupEl);
	if ((elementTopLeftCoords[0] - element.offsetHeight - 10 - popupEl.offsetHeight) > 0) {
		return true;
	}
}

let validateRightOutput = (element,popupEl) => {
	let elementTopLeftCoords = getCoordinates(element);
	let shift = getHorizontalShift(element,popupEl);
	if (validatePopupHeight(popupEl) && (((elementTopLeftCoords[1] + popupEl.offsetWidth + 10) > elementTopLeftCoords[1]) &&
		(elementTopLeftCoords[1] + popupEl.offsetWidth + 10) < getWindowWidth())) {
		return true;
	}	
}

let validatePopupHeight = (element) => {
	return element.offsetHeight < getWindowHeight();
}

let validatePopupWidth = (element) => {
	return element.offsetWidth < getWindowWidth();
}

let groupFunctions = (...rest) => {
	let array = [];
	for (let i = 0; i < rest.length; i++) {
		array.push(rest[i]);
	}
	return array;
}

let hidePopup = () => {
	popupArea.innerHTML = '';
}

let outputPopup = (element,popupEl) => {
	try {
		showPopup(popupEl);
		popupArea.append(popupEl);

		let elementTopLeftCoords = getCoordinates(element);
	
		let validateFunctions = groupFunctions(validateBottomOutput,validateLeftOutput,validateTopOutput,
											validateRightOutput);
	
		let outputFunctions = groupFunctions(outputPopupDown,outputPopupLeft,outputPopupUp,outputPopupRight);
	
		if ((validatePopupHeight(popupEl)) && (validatePopupWidth(popupEl))) {
			for (let i = 0; i < validateFunctions.length; i++) {
				if (modalFlag !== true){
					if (validateFunctions[i](element,popupEl)){
						outputFunctions[i](element,popupEl,elementTopLeftCoords);
						modalFlag = true;
						break;
					}
				}
			}
			if (modalFlag === false){
				modalFlag = true;
				outputPopupAsModal(popupEl);
			}
		}

		if (!(validatePopupHeight(popupEl)) || !(validatePopupWidth(popupEl))){
			throw new Error('Too big popup!');	
		}

	} catch(e) {
		popupArea.remove(popupEl);
	}
}

document.addEventListener('click', ($event) => {
    let el = $event.target;
    if (el.closest('.toggle')) {
        let isAnyOpened = popupArea.children.length !== 0;
        if (isAnyOpened) {
            hidePopup();
        } else {
            outputPopup(el,myPopup);
        }
    } else {
        hidePopup();
    }
});