var listsContainer = document.querySelector("[data-lists]");
var newListForm = document.querySelector("[data-new-list-form]");
var newListInput = document.querySelector("[data-new-list-input]");

newListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  var listName = newListInput.value;
  if (listName === "") return;
  createList(listName);
  newListInput.value = "";
});

function listInputFocus() {
  newListInput.focus();
}

function createList(name) {
  var div1 = document.createElement("div");
  div1.setAttribute("class", "col");
  var div2 = document.createElement("div");
  var div3 = document.createElement("div");
  var div4 = document.createElement("div");
  var div5 = document.createElement("div");
  div5.setAttribute("class", "row");

  var listTitle = document.createElement("h2");
  listTitle.innerText = name;
  listTitle.setAttribute("class", "text-break");
  div2.append(listTitle);

  var buttonElement = document.createElement("input");
  buttonElement.setAttribute("type", "submit");
  buttonElement.setAttribute("value", "+");
  buttonElement.setAttribute("class", "col-1");

  var itemInputElement = document.createElement("input");
  itemInputElement.setAttribute("placeholder", "List Item");
  itemInputElement.setAttribute("class", "iteminput col-10");
  itemInputElement.setAttribute("id", name);
  itemInputElement.setAttribute("autocomplete", "off");

  var labelElement = document.createElement("label");
  labelElement.setAttribute("class", "row");
  labelElement.setAttribute("for", name);
  labelElement.append(buttonElement, itemInputElement);

  var formElement = document.createElement("form");
  formElement.append(labelElement);
  div3.append(formElement);

  var listElement = document.createElement("ul");
  div4.append(listElement);

  var clearButton = document.createElement("button");
  clearButton.setAttribute("class", "col-6");
  clearButton.innerHTML = "Clear Completed";
  clearButton.addEventListener("click", (e) => {
    var items = e.target.parentNode.parentNode.getElementsByTagName("li");
    for (i = items.length - 1; i >= 0; i--) {
      if (items.item(i).classList.contains("done") == true) {
        items.item(i).remove();
      }
    }
    itemInputElement.focus();
  });

  var deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "col-6");
  deleteButton.innerHTML = "Delete List";
  deleteButton.addEventListener("click", (e) => {
    e.target.parentNode.parentNode.remove();
    listInputFocus();
  });

  div5.append(clearButton, deleteButton);

  div1.append(div2, div3, div4, div5);
  listsContainer.appendChild(div1);

  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    var itemName = itemInputElement.value;
    if (itemName === "") return;
    createListItem(itemName, listElement, itemInputElement);
    itemInputElement.value = "";
  });

  itemInputElement.focus();
}

function createListItem(item, list, itemInput) {
  var checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", item);
  checkbox.setAttribute("class", "col-1");

  var label = document.createElement("label");
  label.setAttribute("for", item);
  label.setAttribute("class", "col-9 text-break");

  var li = document.createElement("li");
  li.setAttribute("class", "row d-flex align-items-baseline");

  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = "&#215";
  deleteButton.addEventListener("click", (e) => {
    e.target.parentNode.remove();
    itemInput.focus();
  });
  deleteButton.setAttribute("class", "delete-button col-2");

  label.append(`${item}`);
  li.append(checkbox, label, deleteButton);

  list.insertBefore(li, list.firstChild);

  checkbox.addEventListener("click", (e) => {
    var item = e.target.parentNode;
    item.classList.toggle("done");
    var list = e.target.parentNode.parentNode;
    if (item.classList.contains("done") == true) {
      list.appendChild(item);
    } else {
      list.insertBefore(item, list.firstChild);
    }
  });
}

listInputFocus();

// function toggleDone() {
//   console.log(object);

// }

// function createTaskInput(){
// 	var itemInput = document.createElement("input")
// 	itemInput.setAttribute("type", "text");
// 	itemInput.setAttribute("placeholder", "List Item");
// 	itemInput.setAttribute("class", "item-input")

// }
// console.log(itemInput);

// function listInputLength() {
// 	return listInput.value.length;
// }

// function addListAfterClick() {
// 	if (listInputLength() > 0) {
// 		createList();
// 	}
// }

// function addListAfterKeypress(event) {
// 	if (listInputLength() > 0 && event.keyCode === 13) {
// 		createList();
// 	}
// }

// function createList() {
// 	var itemInput = document.createElement("input")
// 	itemInput.setAttribute("type", "text");
// 	itemInput.setAttribute("placeholder", "List Item");
// 	itemInput.setAttribute("class", "item-input")

// 	var list = document.createElement("ul");
// 	var deleteButton = createDeleteButton();
// 	var listTitle = document.createElement("h2");
// 	var div1 = document.createElement("div");
// 	var div2 = document.createElement("div");

// 	listTitle.innerHTML = `${listInput.value}`;
// 	listTitle.appendChild(deleteButton);
// 	listTitle.appendChild(div2);
// 	div2.appendChild(itemInput);
// 	div2.appendChild(list);
// 	div1.appendChild(listTitle);
// 	listDiv.appendChild(div1);
// 	listInput.value = "";
// 	itemInput.focus();
// }

// function createDeleteButton () {
// 	var deleteButton = document.createElement("button");
// 	deleteButton.innerHTML = "Delete"
// 	deleteButton.addEventListener("click", deleteLi)
// 	return deleteButton;
// }

// button.addEventListener("click", addListAfterClick);

// listInput.addEventListener("keypress", addListAfterKeypress);

// function createItemInput() {
// 	var itemInput = document.createElement("input");
// 	itemInput.setAttribute("type", "text");
// 	itemInput.setAttribute("placeholder", "List Item");
// 	var itemInuputLength = itemInput.value.length;
// 	itemInput.addEventListener("keypress", function() {
// 		function addItemAfterKeypress(event) {
// 			if (itemInuputLength > 0 && event.keyCode === 13) {

// 				function addListItem() {
// 					var checkbox = document.createElement("input");
// 					checkbox.setAttribute("type", "checkbox");
// 					checkbox.setAttribute("id", itemInput.value);
// 					checkbox.addEventListener('click', toggleDone);

// 					var label = document.createElement("label");
// 					label.setAttribute("for", itemInput.value);

// 					var li = document.createElement("li");

// 					var deleteButton = document.createElement("button");
// 					deleteButton.innerHTML = "Delete";
// 					deleteButton.addEventListener("click", deleteLi);

// 					label.appendChild(checkbox);
// 					label.append(`${itemInput.value}`);
// 					label.appendChild(deleteButton);
// 					li.appendChild(label);

// 					itemInput.value = "";
// 				}
// 			}
// 		}
// 	});

// }
