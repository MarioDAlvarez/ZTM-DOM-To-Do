var button = document.getElementById("add");
var listInput = document.getElementById("listinput");
var listDiv = document.getElementById("listDiv")



function listInputFocus (){
	listInput.focus();
}

function inputLength() {
	return listInput.value.length;
}

function addListAfterClick() {
	if (inputLength() > 0) {
		createList();
	}
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
		createList();
	}
}

// function addItemAfterKeypress(event) {
// 	if (itemInuputLength > 0 && event.keyCode === 13) {
// 		return true 
// 	}
// }

function createList() {
	var itemInput = document.createElement("input");
	itemInput.setAttribute("type", "text");
	itemInput.setAttribute("placeholder", "List Item");
	// itemInput.addEventListener("keypress", addItemAfterKeypress);
	
	var list = document.createElement("ul");
	var deleteButton = createDeleteButton();
	var listTitle = document.createElement("h2");
	var div1 = document.createElement("div");
	var div2 = document.createElement("div");
	
	listTitle.innerHTML = `${listInput.value}`;
	listTitle.appendChild(deleteButton);
	listTitle.appendChild(div2);
	div2.appendChild(itemInput);
	div2.appendChild(list);
	div1.appendChild(listTitle);
	listDiv.appendChild(div1);
	listInput.value = "";
}

function deleteLi(){
	this.parentNode.parentNode.remove();
	listInputFocus();
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
}


function createDeleteButton () {
	var deleteButton = document.createElement("button");
	deleteButton.innerHTML = "Delete"
	deleteButton.addEventListener("click", deleteLi)
	return deleteButton;
}
button.addEventListener("click", addListAfterClick);

listInput.addEventListener("keypress", addListAfterKeypress);

listInputFocus();

// function createItemInput() {
// 	var itemInput = document.createElement("input");
// 	itemInput.setAttribute("type", "text");
// 	itemInput.setAttribute("placeholder", "List Item");
// 	var itemInuputLength = itemInput.value.length;
// 	var itemTrue = itemInput.addEventListener("keypress", addItemAfterKeypress);
// 	if (itemTrue == true) {
// 		createlistItem
// 	}
// }


// function createlistItem(itemValue) {
// 	var checkbox = document.createElement("input");
// 	checkbox.setAttribute("type", "checkbox");
// 	checkbox.setAttribute("id", itemInput.value);
// 	checkbox.addEventListener('click', toggleDone);

// 	var label = document.createElement("label");
// 	label.setAttribute("for", itemInput.value);

// 	var li = document.createElement("li");

// 	var deleteButton = document.createElement("button");
// 	deleteButton.innerHTML = "Delete";
// 	deleteButton.addEventListener("click", deleteLi);

// 	label.appendChild(checkbox);
// 	label.append(`${input.value}`);
// 	label.appendChild(deleteButton);
// 	li.appendChild(label);
// 	list.insertBefore(li, list.firstChild);
// 	itemInput.value = "";
// }
