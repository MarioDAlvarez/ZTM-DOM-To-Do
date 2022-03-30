var button = document.getElementById("add");
var input = document.getElementById("userinput");
var list = document.querySelector("ul");



function inputFocus (){
	input.focus();
}
function inputLength() {
	return input.value.length;
}

function addListAfterClick() {
	if (inputLength() > 0) {
		createListElement();
		inputFocus();
	}
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
	}
}
function createListElement() {
	var checkbox = document.createElement("input");
	checkbox.setAttribute("type", "checkbox");
	checkbox.setAttribute("id", input.value);
	checkbox.addEventListener('click', toggleDone);

	var label = document.createElement("label");
	label.setAttribute("for", input.value);

	var li = document.createElement("li");

	var deleteButton = document.createElement("button");
	deleteButton.innerHTML = "Delete"
	deleteButton.addEventListener("click", deleteLi)

	label.appendChild(checkbox);
	label.append(`${input.value}`);
	label.appendChild(deleteButton);
	li.appendChild(label);
	list.insertBefore(li, list.firstChild);
	input.value = "";
}

function deleteLi(){
	this.parentNode.parentNode.remove();
	inputFocus();
}

function toggleDone(item) {
	var item = this.parentNode;
	item.classList.toggle("done");
	var listItem = this.parentNode.parentNode;
	if (item.classList.contains("done") == true) {
		list.appendChild(listItem);
	} else {
		list.insertBefore(listItem, list.firstChild)
	}
	inputFocus();
}

button.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);

document.addEventListener("click", inputFocus);

inputFocus();