let btn = document.querySelector('.toggle');
let myPopup = document.querySelector('.popup');
let modalFlag = false;

function getPopupHeight(popupEl) {
	const height = popupEl.offsetHeight/2;
	return height;	
}

function getHorizontalShift(element,popupEl) {
	return (popupEl.offsetWidth - element.offsetWidth)/2;
}

function getVerticalShift(element,popupEl) {
	return (popupEl.offsetHeight - element.offsetHeight)/2;	
}

function getCoordinates(element) {
	let coords = [];
	coords.push(element.getBoundingClientRect().top);
	coords.push(element.getBoundingClientRect().left);
	return coords;
}

function showPopup(element) {
	element.style.display = "block";	
}

function outputVerticalExtraCases(element,popupEl,btnCoords) {
	if (popupEl.getBoundingClientRect().left < 0) {
		popupEl.style.left = btnCoords[1] + 'px';	
	}
	if (popupEl.getBoundingClientRect().right > getWindowWidth()) {
		popupEl.style.left = getWindowWidth() - (getWindowWidth() - element.getBoundingClientRect().right) - popupEl.offsetWidth + 'px';	
	}	
}

function outputHorizontalExtraCases(element,popupEl) {
	if (popupEl.getBoundingClientRect().bottom > getWindowHeight()) {
		popupEl.style.top = getWindowHeight() - popupEl.offsetHeight - element.offsetHeight + 'px';
	}
	if (popupEl.getBoundingClientRect().top < 0) {
		popupEl.style.top = (getWindowHeight() - popupEl.offsetHeight) / 2 +'px';
	}
}

function outputPopupDown(element,popupEl,btnCoords) {
	let shift = getHorizontalShift(element,popupEl);
	popupEl.style.top = btnCoords[0] + element.offsetHeight + 10 +'px';
	popupEl.style.left = btnCoords[1] - shift + 'px';
	outputVerticalExtraCases(element,popupEl,btnCoords);
}

function outputPopupLeft(element,popupEl,btnCoords) {
	let shift = getVerticalShift(element,popupEl);
	popupEl.style.top = btnCoords[0] - shift +'px';
	popupEl.style.left = btnCoords[1] - popupEl.offsetWidth - 10 +'px';
	outputHorizontalExtraCases(element,popupEl);		
}

function outputPopupUp(element,popupEl,btnCoords) {
	let shift = getHorizontalShift(element,popupEl);
	popupEl.style.top = btnCoords[0] - popupEl.offsetHeight - 10 +'px';
	popupEl.style.left = btnCoords[1] - shift + 'px';
	outputVerticalExtraCases(element,popupEl,btnCoords);
}


function outputPopupRight(element,popupEl,btnCoords) {
	let shift = getVerticalShift(element,popupEl);
	popupEl.style.top = btnCoords[0] - shift +'px';
	popupEl.style.left = btnCoords[1] + element.offsetWidth + 10 +'px';
	outputHorizontalExtraCases(element,popupEl);
}

function outputPopupAsModal(popupEl) {
	popupEl.classList.add("modal");
	popupEl.style.height = getWindowHeight()/2+'px';
	popupEl.style.top = (getWindowHeight() - popupEl.offsetHeight) / 2 + 'px';
	popupEl.style.left = (getWindowWidth() - popupEl.offsetWidth) / 2 + 'px';
}

function validateBottomOutput(element,popupEl) {
	let elementTopLeftCoords = getCoordinates(element);
	let shift = getHorizontalShift(element,popupEl);
	if ((elementTopLeftCoords[0] + element.offsetHeight + 10 + popupEl.offsetHeight) < getWindowHeight()) {
		return true;
	}
}

function validateLeftOutput(element,popupEl) {
	let elementTopLeftCoords = getCoordinates(element);
	let shift = getVerticalShift(element,popupEl);
	if (validatePopupHeight(popupEl) && (((elementTopLeftCoords[1] - popupEl.offsetWidth - 10) < elementTopLeftCoords[1]) &&
		(elementTopLeftCoords[1] - popupEl.offsetWidth - 10) > 0)) {
		return true;
	}	
}

function validateTopOutput(element,popupEl) {
	let elementTopLeftCoords = getCoordinates(element);
	let shift = getHorizontalShift(element,popupEl);
	if ((elementTopLeftCoords[0] - element.offsetHeight - 10 - popupEl.offsetHeight) > 0) {
		return true;
	}
}

function validateRightOutput(element,popupEl) {
	let elementTopLeftCoords = getCoordinates(element);
	let shift = getHorizontalShift(element,popupEl);
	if (validatePopupHeight(popupEl) && (((elementTopLeftCoords[1] + popupEl.offsetWidth + 10) > elementTopLeftCoords[1]) &&
		(elementTopLeftCoords[1] + popupEl.offsetWidth + 10) < getWindowWidth())) {
		return true;
	}	
}

function validatePopupHeight(element) {
	return element.offsetHeight < getWindowHeight();
}

function validatePopupWidth(element) {
	return element.offsetWidth < getWindowWidth();
}

function groupFunctions(...rest) {
	let array = [];
	for (let i = 0; i < rest.length; i++) {
		array.push(rest[i]);
	}
	return array;
}

function hidePopup() {
	popupArea.innerHTML = '';
}

function outputPopup(element,popupEl) {
	try {
		let countOutputs = 0;
		showPopup(popupEl);
		popupArea.append(popupEl);

		let elementTopLeftCoords = getCoordinates(element);
	
		let validateFunctions = groupFunctions(validateBottomOutput,validateLeftOutput,validateTopOutput,
											validateRightOutput);
	
		let outputFunctions = groupFunctions(outputPopupDown,outputPopupLeft,outputPopupUp,outputPopupRight);
	
		if ((validatePopupHeight(popupEl)) && (validatePopupWidth(popupEl))) {
			for (let i = 0; i < validateFunctions.length; i++) {
				if (validateFunctions[i](element,popupEl)){
					countOutputs++;
					outputFunctions[i](element,popupEl,elementTopLeftCoords);
					break;
				}
			}
		}
		if (countOutputs == 0) {
				outputPopupAsModal(popupEl);
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


function getWindowHeight() {
    return window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
}

function getWindowWidth() {
    return window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
}