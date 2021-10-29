const VERSION = "0.1.0";
const TEXTAREA = document.getElementById("textarea");
const MODAL = document.getElementById("modal");

let SELECTED_BEFORE = "";
let TRANSLATED_BEFORE = "";

/*
function closeModal(e) {
  console.log(e.target.id);
  if (MODAL.style.display === "inline-block" && e.target.id !== "modal") {
    MODAL.style.display = "none";
  }
}
*/

window.addEventListener("keyup", (e) => {
  if (MODAL.style.display === "inline-block" && e.key === "Escape") {
    MODAL.style.display = "none";
  }
});

TEXTAREA.addEventListener("click", translateText);

function translateText() {
  const selection = document.getSelection();

  if (selection.toString().length > 0) {
    const selectedText = selection.toString();

    const rect = selection.getRangeAt(0).getBoundingClientRect();
    const modalText = document.getElementById("modal-text");

    if (selectedText === SELECTED_BEFORE) {
      modalText.innerHTML = TRANSLATED_BEFORE;
    } else {
      SELECTED_BEFORE = selectedText;

      modalText.innerHTML = "번역중...";

      fetch("https://popogo-server.herokuapp.com/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: selectedText,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          modalText.innerHTML = res.message.result.translatedText;
          TRANSLATED_BEFORE = res.message.result.translatedText;
        });
    }
    MODAL.style.display = "inline-block";
    MODAL.style.left = rect.left + "px";
    MODAL.style.top = rect.top + rect.height + 8 + "px";
  }
}

function checkBrowser() {
  const agt = navigator.userAgent.toLowerCase();
  if (agt.indexOf("firefox") != -1) {
    TEXTAREA.innerHTML =
      "죄송합니다. FireFox 브라우저는 아직 지원하지 않습니다.";
  }
}

function openNaverDictionary() {
  window.open(
    `https://en.dict.naver.com/#/search?query=${SELECTED_BEFORE}`,
    "_blank"
  );
}

function openGoogleSearch() {
  window.open(`https://www.google.com/search?q=${SELECTED_BEFORE}`, "_blank");
}

function msgAbout() {
  TEXTAREA.innerHTML =
    `------

Popogo는 영어 원문을 읽을 때 번거로운 번역 과정을 줄여주는 서비스입니다.

네이버 AI 번역기, 파파고(Papago)에서 아이디어를 얻어 개발했으며 
특히 텍스트 입력창을 더 넓게 구현하는 것에 집중했습니다.

"네이버 오픈 API - Papago 번역"을 사용하여 번역 결과물을 제공받습니다.
서비스명, 로고, UI는 파파고를 참고하여 디자인했습니다.

v${VERSION}
Developed by yeoularu

------

` + TEXTAREA.innerHTML;

  TEXTAREA.focus();
}

function msgHowToUse() {
  TEXTAREA.innerHTML =
    `------

1. 읽고 싶은 영어 원문을 복사해 여기에 붙여넣습니다.

2. 번역하고 싶은 단어나 문장을 드래그하여 번역합니다.

*주의* 
- 한 번에 최대 1,000글자까지 번역 가능합니다.
- 하루 10,000글자로 사용량이 제한되어있어 남용 자제를 부탁드립니다.

------

` + TEXTAREA.innerHTML;

  TEXTAREA.focus();
}

(function init() {
  checkBrowser();
})();
