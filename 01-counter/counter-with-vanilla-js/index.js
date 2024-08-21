let count = 0;

const countHeader = document.getElementById("count");
const plusBtn = document.getElementById("plus");
const minusBtn = document.getElementById("minus");
countHeader.innerText = count;

plusBtn.addEventListener("click", () => {
    if (count < 10) {
        countHeader.innerText = ++count;
    }
});

minusBtn.addEventListener("click", () => {
    if (count > 0) {
        countHeader.innerText = --count;
    }
});