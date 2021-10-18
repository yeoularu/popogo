function resize(obj) {
  obj.style.height = "1px";
  obj.style.height = 12 + obj.scrollHeight + "px";
}

const selectedObj = window.getSelection();

let selectedText = "",
  translatedText = "";

function translateText(obj) {
  selectedText = selectedObj.toString();
  console.log(selectedText);
}
