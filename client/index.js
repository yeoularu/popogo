
let selectedText = "",
  translatedText = "";

document.onmouseup = () => {
  if (document.getSelection().toString().length > 0) {
    selectedText = document.getSelection().toString();

    console.log(selectedText);

    fetch("http://127.0.0.1:3000/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: selectedText,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        translatedText = res.message.result.translatedText;
        console.log(translatedText);
      });
  }
};
