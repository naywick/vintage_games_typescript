// let tiles: HTMLElement[][] = [];
// for (let y=0; y<22; ++y) {
//     tiles.push([]);
//     let row = document.createElement("div");
//     row.style.clear = "both";
//     for (let x=0; x<12; ++x) {
//         let div = document.createElement("div");
//         div.style.width = "32px";
//         div.style.height = "32px";
//         div.style.float = "left";
//         div.style.backgroundColor = "#000000";
//         row.appendChild(div);
//         tiles[y].push(div);
//     }
//     document.body.appendChild(row);
// }

let list = document.createElement("div")
let title = document.createElement("h1")
let tasks = document.createElement("div") // container div for list items
let input = document.createElement("input")
let checkbox = document.createElement("checkbox")
let button = document.createElement("button")
let delete_button = document.createElement("button")

title.innerText = "This is a title";
button.innerText = "Submit";
delete_button.innerText = "Delete";
list.style.backgroundColor = "#98ff98";
document.body.appendChild(list);
list.appendChild(title);
list.appendChild(tasks);
list.appendChild(input);
list.appendChild(button);
list.appendChild(delete_button);

input.onchange = handleReturnButton;

function handleReturnButton() {
  makeItem(input.value)
  input.value = '';
};

button.onclick = function handleSubmitButton() {
  if (input.value != '') {
    makeItem(input.value)
    input.value = '';
  } else {
    alert("Please input a value");
  }
};

delete_button.onclick = deleteCheckedItems;


function makeItem(value: string) {
  let item = document.createElement("div");
  item.innerText = value;
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.onchange = checkedItem;
  tasks.appendChild(item);
  item.appendChild(checkbox);
};

function checkedItem(event: any) {
  //strikethrough
  if (event.target.checked) {
    event.target.parentElement.style.textDecoration = "line-through";
  } else {
    // remove strikethrough
    event.target.parentElement.style.textDecoration = "none";
  }
};

function isChecked(node: HTMLElement) {
  console.debug(node)
  console.log("Hits the isChecked function")
  if (node.style.textDecoration == "line-through") {
    console.log("True")
    return true
  } else {
    console.log("It returned false")
    return false
  }
};

function deleteCheckedItems() {
  tasks.childNodes.forEach(item => {
    console.debug(item)
    if (isChecked(item as HTMLElement) == true) {
      item.remove();
    }
  });
};
