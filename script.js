var listsContainer = document.querySelector("[data-lists]");
var newListForm = document.querySelector("[data-new-list-form]");
var newListInput = document.querySelector("[data-new-list-input]");
var body = document.querySelector("body");

window.onload = () => {
  createList("Sample List");

  var sampleList = listsContainer.firstChild;
  var list = sampleList.querySelector("ul");

  createListItem("Item1", list);
  createListItem("Item2", list);

  var checkedItem = list.firstChild.querySelector("input");
  checkedItem.setAttribute("checked", "true");
  checkedItem.parentNode.nextElementSibling.classList.add("done");

  list.append(checkedItem.parentNode.parentNode);

  var close = sampleList.getElementsByClassName("close-button");
  var input = sampleList.getElementsByClassName("form-element");
  var footer = sampleList.getElementsByClassName("fodal-footer");
  var backdrop = document.getElementsByClassName("fodal-backdrop");
  var hide = [close.item(0), input.item(0), footer.item(0), backdrop.item(0)];

  addHidden(hide);

  for (button of list.getElementsByTagName("input")) {
    button.classList.remove("checkbox");
  }

  sampleList.classList.remove("fodal");
  sampleList.addEventListener("mouseenter", () => {});
  listInputFocus();
};

document.addEventListener("copy", function (e) {
  const text_only = document.getSelection().toString();
  const clipdata = e.clipboardData || window.clipboardData;
  clipdata.setData("text/plain", text_only);
  clipdata.setData("text/html", text_only);
  e.preventDefault();
});

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
  listTitle.addEventListener("click", () => {
    listTitle.setAttribute("contenteditable", "true");
    listTitle.focus();
  });
  listTitle.addEventListener("blur", () => {
    console.log(listTitle.innerHTML);
    if (listTitle.innerHTML == "") {
      console.log("working");
      listTitle.innerHTML = "Title";
    }
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
  itemInputElement.setAttribute("autocomplete", "off");

  var labelElement = document.createElement("label");
  labelElement.setAttribute("class", "row label-margin");
  labelElement.setAttribute("for", id);
  labelElement.append(buttonElement, itemInputElement);

  var formElement = document.createElement("form");
  formElement.append(labelElement);
  var div3 = document.createElement("div");
  div3.classList.add("form-element");
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
  clearButton.setAttribute(
    "class",
    "col-12 col-md-5 btn btn-outline-light footer-buttons margin-bottom"
  );
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
  deleteButton.setAttribute(
    "class",
    "col-12 col-md-5 btn btn-outline-light footer-buttons"
  );
  deleteButton.innerHTML = "Delete List";
  deleteButton.addEventListener("click", (e) => {
    div7.remove();
    div9.remove();
    listInputFocus();
  });

  var div5 = document.createElement("div");
  div5.setAttribute("class", "row fodal-footer justify-content-center");
  div5.append(clearButton, deleteButton);

  var div1 = document.createElement("div");
  div1.setAttribute("class", "fodal-content");
  div1.append(div2, div8, div5);

  var div6 = document.createElement("div");
  div6.setAttribute("class", "fodal-dialog");
  div6.append(div1);
  var div7 = document.createElement("div");
  div7.setAttribute("class", "fodal");
  div7.setAttribute("id", id);
  div7.append(div6);

  listsContainer.appendChild(div7);

  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    var itemName = itemInputElement.value;
    if (itemName === "") {
      itemInputElement.focus();
      return;
    }
    createListItem(itemName, listElement);
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
      removeHidden(toggleHide);
      div1.classList.remove("min-div");
      div8.classList.remove("body-overflow");
      div2.classList.remove("line-clamp");
      for (button of listElement.getElementsByTagName("input")) {
        button.classList.add("checkbox");
      }
    }
    itemInputElement.focus();
  });

  closeButton.addEventListener("mouseup", () => {
    div7.classList.remove("fodal");
    addHidden(toggleHide);
    div1.classList.add("min-div");
    div8.classList.add("body-overflow");
    div2.classList.add("line-clamp");
    for (button of listElement.getElementsByTagName("input")) {
      button.classList.remove("checkbox");
    }
    for (name of listElement.getElementsByClassName("item-name")) {
      name.classList.add("line-clamp-item");
    }

    listInputFocus();
  });

  itemInputElement.focus();
}

function createListItem(item, list) {
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
  li.addEventListener("mouseenter", () => {
    if (
      list.parentNode.parentNode.firstChild.classList.contains("hidden") ===
      false
    ) {
      deleteButton.classList.remove("hidden");
    }
  });
  li.addEventListener("mouseleave", () => {
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
    "col-2 delete-button btn btn-outline-light hidden"
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
