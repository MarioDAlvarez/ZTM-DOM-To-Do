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
  var div2 = document.createElement("div");
  var div3 = document.createElement("div");
  var div4 = document.createElement("div");

  var listTitle = document.createElement("h2");
  listTitle.innerText = name;
  div2.append(listTitle);

  var buttonElement = document.createElement("input");
  buttonElement.setAttribute("type", "submit");
  buttonElement.setAttribute("value", "+");

  var itemInputElement = document.createElement("input");
  itemInputElement.setAttribute("placeholder", "List Item");
  itemInputElement.setAttribute("class", "iteminput");
  itemInputElement.setAttribute("id", name);
  itemInputElement.setAttribute("autocomplete", "off");

  var labelElement = document.createElement("label");
  labelElement.setAttribute("for", name);
  labelElement.append(buttonElement, itemInputElement);
  var formElement = document.createElement("form");

  formElement.appendChild(labelElement);
  div3.append(formElement);

  var listElement = document.createElement("ul");
  div4.append(listElement);

  var clearButton = document.createElement("button");
  clearButton.innerHTML = "Clear Completed";
  clearButton.addEventListener("click", (e) => {
    var items = e.target.parentNode.getElementsByTagName("li");
    for (i = items.length - 1; i >= 0; i--) {
      if (items.item(i).classList.contains("done") == true) {
        items.item(i).remove();
      }
    }
    itemInputElement.focus();
  });

  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete List";
  deleteButton.addEventListener("click", (e) => {
    e.target.parentNode.remove();
    listInputFocus();
  });

  div1.append(div2, div3, div4, clearButton, deleteButton);
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

  var label = document.createElement("label");
  label.setAttribute("for", item);

  var li = document.createElement("li");

  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = "X";
  deleteButton.addEventListener("click", (e) => {
    e.target.parentNode.remove();
    itemInput.focus();
  });

  label.appendChild(checkbox);
  label.append(`${item}`);
  li.appendChild(label);
  li.appendChild(deleteButton);

  list.insertBefore(li, list.firstChild);

  checkbox.addEventListener("click", (e) => {
    var item = e.target.parentNode.parentNode;
    item.classList.toggle("done");
    var list = e.target.parentNode.parentNode.parentNode;
    if (item.classList.contains("done") == true) {
      list.appendChild(item);
    } else {
      list.insertBefore(item, list.firstChild);
    }
  });
}

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

listInputFocus();

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
