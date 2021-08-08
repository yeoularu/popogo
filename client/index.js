function selectText() {
    if (window.getSelection().toString().length == 0) {
        return;
    }
    return window.getSelection().toString();
}

window.onmouseup = () => console.log(selectText());
