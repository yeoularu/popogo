const VERSION = "0.1.0";

const TEXTAREA = document.getElementById("textarea");
const MODAL = document.getElementById("modal");

let SELECTED_BEFORE = "";
let TRANSLATED_BEFORE = "";

function isModalOn() {
  return MODAL.style.display === "inline-block";
}

function addELcloseModalByClick() {
  window.addEventListener("mousedown", (e) => {
    if (isModalOn() && !e.path.map((elem) => elem.id).includes("modal")) {
      MODAL.style.display = "none";
    }
  });
}

function addELcloseModalByESC() {
  window.addEventListener("keyup", (e) => {
    if (isModalOn() && e.key === "Escape") {
      MODAL.style.display = "none";
    }
  });
}

function addELtranslate() {
  TEXTAREA.addEventListener("click", translateText);
}

function translateText() {
  const selection = document.getSelection();
  const selectedText = selection.toString();

  if (selectedText.length === 0) {
    return;
  }

  const modalText = document.getElementById("modal-text");
  const rect = selection.getRangeAt(0).getBoundingClientRect();

  function showModal() {
    MODAL.style.display = "inline-block";
    MODAL.style.left = rect.left + "px";
    MODAL.style.top = rect.top + rect.height + 8 + "px";
  }

  if (selectedText.length >= 1000) {
    modalText.innerHTML = `π’ 1000κΈμ κΉμ§λ§ λ²μ­νμ€ μ μμ΅λλ€. μ νλ κΈμ μ : ${selectedText.length}`;
    showModal();
    return;
  }

  if (selectedText === SELECTED_BEFORE) {
    modalText.innerHTML = TRANSLATED_BEFORE;
    showModal();

    return;
  }

  SELECTED_BEFORE = selectedText;

  modalText.innerHTML = "λ²μ­μ€...";

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
    })
    .catch((error) => {
      console.log(error);
      modalText.innerHTML = `ERROR: ${error.message}`;
    });

  showModal();
}

function checkBrowser() {
  const agt = navigator.userAgent.toLowerCase();
  if (agt.indexOf("firefox") != -1) {
    TEXTAREA.innerHTML =
      "μ£μ‘ν©λλ€. FireFox λΈλΌμ°μ λ μμ§ μ§μνμ§ μμ΅λλ€.";
    return "ff";
  }
}

function addELopenNaverDictionary() {
  document
    .getElementById("modal-naver-dictionary")
    .addEventListener("click", () =>
      window.open(
        `https://en.dict.naver.com/#/search?query=${SELECTED_BEFORE}`,
        "_blank"
      )
    );
}

function addELopenGoogleSearch() {
  document
    .getElementById("modal-google")
    .addEventListener("click", () =>
      window.open(
        `https://www.google.com/search?q=${SELECTED_BEFORE}`,
        "_blank"
      )
    );
}

function addELmsgAbout() {
  document.getElementById("msg-about").addEventListener("click", () => {
    TEXTAREA.innerHTML =
      `------

Popogoλ μμ΄ μλ¬Έμ μ½μ λ λ²κ±°λ‘μ΄ λ²μ­ κ³Όμ μ μ€μ¬μ£Όλ μλΉμ€μλλ€.

λ€μ΄λ² AI λ²μ­κΈ°, ννκ³ (Papago)μμ μμ΄λμ΄λ₯Ό μ»μ΄ κ°λ°νμΌλ©° 
νΉν νμ€νΈ μλ ₯μ°½μ λ λκ² κ΅¬ννλ κ²μ μ§μ€νμ΅λλ€.

"λ€μ΄λ² μ€ν API - Papago λ²μ­"μ μ¬μ©νμ¬ λ²μ­ κ²°κ³Όλ¬Όμ μ κ³΅λ°μ΅λλ€.
μλΉμ€λͺ, λ‘κ³ , UIλ ννκ³ λ₯Ό μ°Έκ³ νμ¬ λμμΈνμ΅λλ€.

v${VERSION}
Developed by yeoularu

------

` + TEXTAREA.innerHTML;

    TEXTAREA.focus();
  });
}

function addELmsgHowToUse() {
  document.getElementById("msg-how-to-use").addEventListener("click", () => {
    TEXTAREA.innerHTML =
      `------

1. μ½κ³  μΆμ μμ΄ μλ¬Έμ λ³΅μ¬ν΄ μ¬κΈ°μ λΆμ¬λ£μ΅λλ€.

2. λ²μ­νκ³  μΆμ λ¨μ΄λ λ¬Έμ₯μ λ§μ°μ€ λλκ·Έν΄ λ²μ­ν©λλ€.

3. μ°μΈ‘ μλ¨ λΈλμ λ²νΌμ ν΄λ¦­ν΄ νλ§λ₯Ό λ³κ²½ν©λλ€.

- ν λ²μ μ΅λ 1,000κΈμκΉμ§ λ²μ­ κ°λ₯ν©λλ€.
- νλ£¨ 10,000κΈμλ‘ μ¬μ©λμ΄ μ νλ©λλ€.

------

` + TEXTAREA.innerHTML;

    TEXTAREA.focus();
  });
}

(function init() {
  checkBrowser();
  if (checkBrowser() === "ff") {
    return;
  }
  addELtranslate();
  addELopenNaverDictionary();
  addELopenGoogleSearch();
  addELcloseModalByESC();
  addELcloseModalByClick();
  addELmsgAbout();
  addELmsgHowToUse();
})();
