let selectedText = "",
  translatedText = "";

const selObj = document.getSelection();

document.onmouseup = () => {
  if (selObj.toString().length > 0) {
    const selectedText = selObj.toString();

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

        const textarea = document.getElementById("textSource"),
          indexStart = textarea.selectionStart,
          indexEnd = textarea.selectionEnd;
        console.log(translatedText);
        console.log(indexStart);
        console.log(indexEnd);
        textarea.value =
          textarea.value.substring(0, indexEnd) +
          "(" +
          translatedText +
          ") " +
          textarea.value.substring(indexEnd);
      });
  }
};
