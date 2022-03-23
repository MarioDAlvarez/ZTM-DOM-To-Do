var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");

input.focus();

function inputLength() {
	return input.value.length;
}

function createListElement() {
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(input.value));
	// var deleteButton = addDeleteButton();
	// li.appendChild(deleteButton)
	ul.appendChild(li);
	input.value = "";
}

function addListAfterClick() {
	if (inputLength() > 0) {
		createListElement();
	}
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
	}
}

// function toggleLineThrough() {
// 	this.classList.toggle("done");
// }

function addDeleteButton() {
	var deleteButton = document.createElement("button");
	deleteButton.innerHTML = "Delete"
	// deleteButton.addEventListener("click", deleteLi)
}

// function deleteLi(event){
// 	this.parentNode.remove();
// 	this.remove();
// }

button.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);

// for (i = 0; i < listItem.length; i++) {

// listItem[i].addEventListener("click", toggleLineThrough);
// addDeleteButton(i);
// }