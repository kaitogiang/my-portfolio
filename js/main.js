const contactEmailInput = document.getElementById("email");
const contactMessageInput = document.getElementById("message");
const rootStyles = getComputedStyle(document.documentElement);
const checkIcon = rootStyles.getPropertyValue("--check-circle-icon").trim();
const wrongIcon = rootStyles.getPropertyValue("--wrong-circle-icon").trim();

document.addEventListener("scroll", (event) => {
    console.log(window.scrollY);
    handleArrowUpVisibility(window.scrollY);
});

// console.log(checkIcon);
// console.log(wrongIcon);
setupListeners();
/**
 *
 * @param {Number} offset
 */
function handleArrowUpVisibility(offset) {
    const arrowUpElement = document.getElementById("arrow-up");
    const viewportHeight = window.innerHeight;
    console.log("Inner height: " + viewportHeight);
    console.log(`Offset has been passed: ${offset}`);
    if (offset <= viewportHeight) {
        arrowUpElement.style.opacity = 0;
        console.log("asdfasdf");
    } else {
        arrowUpElement.style.opacity = 1;
        console.log("Block");
    }
}

function setupListeners() {
    contactEmailInput.addEventListener("input", validateEmailInput);
}
/**
 *
 * @param {Event} event
 */
function validateEmailInput(event) {
    const regex =
        /[A-Za-z][\w]*(?:[._\-\+][\w]+)?@[\w]+(?:\.[\w]+)*\.[A-Za-z]{2,}/g;
    const currentValue = event.target.value;
    if (currentValue == "") {
        contactEmailInput.style.backgroundImage = "";
        return;
    }
    const isValidEmail = regex.test(currentValue);
    if (isValidEmail) {
        contactEmailInput.style.backgroundImage = checkIcon;
    } else {
        contactEmailInput.style.backgroundImage = wrongIcon;
    }
}
