const contactEmailInput = document.getElementById("email");
const contactMessageInput = document.getElementById("message");
const rootStyles = getComputedStyle(document.documentElement);
const checkIcon = rootStyles.getPropertyValue("--check-circle-icon").trim();
const wrongIcon = rootStyles.getPropertyValue("--wrong-circle-icon").trim();
const toggleNavButton = document.getElementById("toggle_nav");
const headerNav = document.getElementById("header_nav");
const headerCloseButton = document.getElementById("header_close_icon");
const headerNavItemList = document.getElementsByClassName("header__nav-item");
//get class
const headerWrapperElement = document.querySelector(".header__wrapper");
const heroElement = document.querySelector(".hero");

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
    toggleNavButton.addEventListener("click", handleToggleNavClicked);
    headerCloseButton.addEventListener("click", handleCloseNavClicked);
    for (let headerItem of headerNavItemList) {
        headerItem.addEventListener("click", handleCloseNavClicked);
    }
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

function handleToggleNavClicked(event) {
    console.log("Click hambuger");
    headerWrapperElement.classList.add("hide-header");
    headerNav.classList.add("show-nav");
    heroElement.style.height = 70 + "vh";
}

function handleCloseNavClicked(event) {
    headerNav.classList.remove("show-nav");
    headerWrapperElement.classList.remove("hide-header");
    heroElement.style.height = 100 + "vh";
}
