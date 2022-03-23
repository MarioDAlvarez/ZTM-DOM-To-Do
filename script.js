var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
var listItem = document.getElementsByTagName("li");

function inputLength() {
	return input.value.length;
}

function createListElement() {
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(input.value));
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

function toggleLineThrough() {
	this.classList.toggle("done");
}

function addDeleteButton(locationIndex) {
	var newDeleteButton = document.createElement("button");
	var newDButtonText = document.createTextNode("Delete");
	newDeleteButton.appendChild(newDButtonText);
	newDeleteButton.addEventListener("click",deleteLi)
	ul.insertBefore(newDeleteButton,listItem[locationIndex]);
}

function deleteLi(event){ //Deletes associated text node and itself
	this.previousElementSibling.remove();
	this.remove();
}

button.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);

for (i = 0; i < listItem.length; i++) {

listItem[i].addEventListener("click", toggleLineThrough);
addDeleteButton(i);
}