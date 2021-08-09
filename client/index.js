function selectText() {
  if (window.getSelection().toString().length == 0) {
    return;
  }
  return window.getSelection().toString();
}

window.onmouseup = () => {
  fetch('http://127.0.0.1:3000/translate', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      text: "hi"
    })
  })
  .then(res => res.json())
  .then(res => console.log(res));
};
