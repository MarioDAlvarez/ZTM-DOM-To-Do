var listsContainer = document.querySelector("[data-lists]");
var newListForm = document.querySelector("[data-new-list-form]");
var newListInput = document.querySelector("[data-new-list-input]");
var body = document.querySelector("body");

// window.onload = createList("Title");

newListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  var listName = newListInput.value;
  if (listName === "") {
    newListInput.focus();
    return;
  }
  createList(listName);
  newListInput.value = "";
});

function listInputFocus() {
  newListInput.focus();
}

function createList(name) {
  var id = Date.now();
  var listTitle = document.createElement("h2");
  listTitle.innerText = name;
  listTitle.setAttribute("class", "list-name text-break col-10");
  // listTitle.addEventListener("click", editData);
  listTitle.addEventListener("click", () => {
    listTitle.setAttribute("contenteditable", "true");
    listTitle.focus();
  });
  listTitle.addEventListener("blur", () => {
    listTitle.setAttribute("contenteditable", "false");
  });
  listTitle.addEventListener("keydown", (evt) => {
    if (evt.key === "Enter") {
      evt.preventDefault();
    }
  });

  var closeButton = document.createElement("button");
  closeButton.innerHTML = "&#215";
  closeButton.setAttribute("class", "btn btn-outline-light close-button col-2");

  var div2 = document.createElement("div");
  div2.setAttribute("class", "fodal-header");
  div2.append(listTitle, closeButton);

  var buttonElement = document.createElement("input");
  buttonElement.setAttribute("type", "submit");
  buttonElement.setAttribute("value", "+");
  buttonElement.setAttribute(
    "class",
    "col-1 btn btn-outline-light list-item-add"
  );

  var itemInputElement = document.createElement("input");
  itemInputElement.setAttribute("placeholder", "Add a task...");
  itemInputElement.setAttribute("class", "iteminput col-10");
  itemInputElement.setAttribute("id", id);
  itemInputElement.setAttribute("autocomplete", "off");

  var labelElement = document.createElement("label");
  labelElement.setAttribute("class", "row label-margin");
  labelElement.setAttribute("for", id);
  labelElement.append(buttonElement, itemInputElement);

  var formElement = document.createElement("form");
  formElement.append(labelElement);
  var div3 = document.createElement("div");
  div3.append(formElement);

  var listElement = document.createElement("ul");
  var div4 = document.createElement("div");
  div4.append(listElement);

  var div8 = document.createElement("div");
  div8.setAttribute("class", "fodal-body");
  div8.append(div3, div4);

  var div9 = document.createElement("div");
  div9.setAttribute("class", "fodal-backdrop");
  body.append(div9);

  var clearButton = document.createElement("button");
  clearButton.setAttribute("class", "col-6");
  clearButton.innerHTML = "Clear Completed";
  clearButton.addEventListener("click", (e) => {
    console.log(div8.getElementsByClassName("item-name"));
    var items = div8.getElementsByClassName("item-name");
    for (i = items.length - 1; i >= 0; i--) {
      if (items.item(i).classList.contains("done") == true) {
        items.item(i).parentNode.remove();
      }
    }
    itemInputElement.focus();
  });

  var deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "col-6");
  deleteButton.innerHTML = "Delete List";
  deleteButton.addEventListener("click", (e) => {
    div7.remove();
    div9.remove();
    listInputFocus();
  });

  var div5 = document.createElement("div");
  div5.setAttribute("class", "row fodal-footer");
  div5.append(clearButton, deleteButton);

  var div1 = document.createElement("div");
  div1.setAttribute("class", "fodal-content");
  div1.append(div2, div8, div5);

  var div6 = document.createElement("div");
  div6.setAttribute("class", "fodal-dialog");
  div6.append(div1);
  var div7 = document.createElement("div");
  div7.setAttribute("class", "fodal");
  div7.append(div6);

  listsContainer.appendChild(div7);

  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    var itemName = itemInputElement.value;
    if (itemName === "") {
      itemInputElement.focus();
      return;
    }
    createListItem(itemName, listElement, itemInputElement);
    itemInputElement.value = "";
    itemInputElement.focus();
  });

  itemInputElement.addEventListener("blur", () => {
    var itemName = itemInputElement.value;
    if (itemName === "") return;
    createListItem(itemName, listElement, itemInputElement);
    itemInputElement.value = "";
  });

  var toggleHide = [closeButton, div3, div5, div9];

  div7.addEventListener("mousedown", () => {
    if (closeButton.classList.contains("hidden") == true) {
      div7.classList.add("fodal");
      div2.classList.remove("no-underline");
      removeHidden(toggleHide);
      removeHidden(listElement.getElementsByTagName("button"));
      div8.classList.remove("min-div");
    }
    itemInputElement.focus();
  });

  closeButton.addEventListener("mouseup", () => {
    div7.classList.remove("fodal");
    div2.classList.add("no-underline");
    addHidden(toggleHide);
    addHidden(listElement.getElementsByTagName("button"));
    div8.classList.add("min-div");
    listInputFocus();
  });

  itemInputElement.focus();
}

function createListItem(item, list, itemInput) {
  var checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("class", "checkbox");

  var label2 = document.createElement("label");
  label2.setAttribute("class", "col-1 checkbox-control");
  label2.appendChild(checkbox);

  var label = document.createElement("label");
  label.setAttribute("class", "col-9 item-name text-break");
  label.addEventListener("click", () => {
    label.setAttribute("contenteditable", "true");
    label.focus();
  });
  label.addEventListener("blur", () => {
    label.setAttribute("contenteditable", "false");
  });

  label.addEventListener("keydown", (evt) => {
    if (evt.key === "Enter") {
      evt.preventDefault();
    }
  });

  var li = document.createElement("li");
  li.setAttribute("class", "row align-items-baseline li-padding");
  li.addEventListener("mouseover", () => {
    if (
      itemInput.parentNode.parentNode.parentNode.classList.contains(
        "hidden"
      ) === false
    ) {
      deleteButton.classList.remove("hidden");
    }
  });
  li.addEventListener("mouseout", () => {
    deleteButton.classList.add("hidden");
  });

  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = "&#215";
  deleteButton.addEventListener("click", (e) => {
    e.target.parentNode.remove();
    itemInput.focus();
  });
  deleteButton.setAttribute(
    "class",
    "delete-button col-2 delete-button hidden"
  );

  label.append(`${item}`);
  li.append(label2, label, deleteButton);

  list.insertBefore(li, list.firstChild);

  checkbox.addEventListener("click", (e) => {
    var itemName = e.target.parentNode.parentNode.childNodes[1];
    var item = e.target.parentNode.parentNode;
    itemName.classList.toggle("done");
    var list = e.target.parentNode.parentNode.parentNode;
    if (itemName.classList.contains("done") == true) {
      list.appendChild(item);
    } else {
      list.insertBefore(item, list.firstChild);
    }
  });
}

// function editData(e) {
//   const el = e.target;
//   if (el.parentNode.tagName == "LI") {
//     el.parentNode.classList.add("item-border");
//     el.parentNode.classList.remove("li-padding");
//   }

//   const input = document.createElement("input");

//   if (el.classList.contains("done")) {
//     input.setAttribute("class", "col-9 item-name text-break done");
//   } else if (el.tagName == "LABEL") {
//     input.setAttribute("class", "col-9 item-name text-break");
//   } else {
//     input.setAttribute("class", "list-name text-break col-10");
//   }
//   input.setAttribute("value", el.textContent);
//   input.selectionStart = input.selectionEnd = input.value.length;
//   el.replaceWith(input);

//   const save = function () {
//     const previous = document.createElement(el.tagName.toLowerCase());
//     if (el.classList.contains("done")) {
//       previous.setAttribute("class", "col-9 item-name text-break done");
//     } else if (el.tagName == "LABEL") {
//       previous.setAttribute("class", "col-9 item-name text-break");
//     } else {
//       previous.setAttribute("class", "list-name text-break col-10");
//     }
//     previous.onclick = editData;
//     previous.textContent = input.value;
//     input.replaceWith(previous);
//     if (previous.parentNode.tagName == "LI") {
//       previous.parentNode.classList.remove("item-border");
//       previous.parentNode.classList.add("li-padding");
//     }
//   };
//   input.addEventListener("blur", save, {
//     once: true,
//   });
//   input.focus();
// }

function addHidden(array) {
  for (i = 0; i < array.length; i++) {
    array[i].classList.add("hidden");
  }
}

function removeHidden(array) {
  for (i = 0; i < array.length; i++) {
    array[i].classList.remove("hidden");
  }
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

//
