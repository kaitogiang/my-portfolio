const contactEmailInput = document.getElementById("email");
const contactMessageInput = document.getElementById("message");
const submitButton = document.querySelector(".contact-form__btn");
const rootStyles = getComputedStyle(document.documentElement);
const checkIcon = rootStyles.getPropertyValue("--check-circle-icon").trim();
const wrongIcon = rootStyles.getPropertyValue("--wrong-circle-icon").trim();
const toggleNavButton = document.getElementById("toggle_nav");
const headerNav = document.getElementById("header_nav");
const headerCloseButton = document.getElementById("header_close_icon");
const headerNavItemList = document.getElementsByClassName("header__nav-item");
//Alert
const alertElement = document.getElementById("alert");
const alertTitle = document.getElementById("alert-title");
const alertContent = document.getElementById("alert-content");
const alertCloseButton = document.getElementById("alert-close-button");

//form
const formElement = document.getElementById("form");

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
    const submitButton = document.querySelector(".contact-form__btn");
    submitButton.addEventListener("click", submitContactForm);
    alertCloseButton.addEventListener("click", () => showOrHideAlert(false));
}
/**
 *
 * @param {Event} event
 */
function validateEmailInput(event) {
    // const regex =
    //     /[A-Za-z][\w]*(?:[._\-\+][\w]+)?@[\w]+(?:\.[\w]+)*\.[A-Za-z]{2,}/g;
    const currentValue = event.target.value;
    if (currentValue == "") {
        contactEmailInput.style.backgroundImage = "";
        return;
    }
    const isValidEmail = checkValidEmail(currentValue);
    if (isValidEmail) {
        contactEmailInput.style.backgroundImage = checkIcon;
    } else {
        contactEmailInput.style.backgroundImage = wrongIcon;
    }
}

function checkValidEmail(email) {
    const regex =
        /[A-Za-z][\w]*(?:[._\-\+][\w]+)?@[\w]+(?:\.[\w]+)*\.[A-Za-z]{2,}/g;
    return regex.test(email);
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
/**
 *
 * @param {Event} e
 */
function submitContactForm(e) {
    e.preventDefault();
    const emailValue = contactEmailInput.value;
    const messageValue = contactMessageInput.value;
    const isValidEmail = checkValidEmail(emailValue);
    console.log(`Email: ${emailValue}`);
    if (emailValue == "" || messageValue == "") {
        console.log("Empty");
        scheduleAlert(() => showErrorAlert("This field cannot be empty"), 2000);
    } else if (!isValidEmail) {
        scheduleAlert(() => showErrorAlert("Email is not valid!"), 2000);
    } else {
        //Valid fields.
        sendMailRequest(emailValue, messageValue);
    }
}

function showOrHideAlert(isShow = true) {
    if (isShow) {
        console.log("show...");
        alertElement.classList.add("alert--show");
    } else {
        alertElement.classList.remove("alert--show");
    }
}

function showErrorAlert(message) {
    alertTitle.innerHTML = "Error!";
    alertContent.innerHTML = message;
    showOrHideAlert();
}

function showSuccessAlert(message) {
    alertTitle.innerHTML = "Success";
    alertContent.innerHTML = message;
    showOrHideAlert();
}

function scheduleAlert(callback, time) {
    callback();
    setTimeout(() => showOrHideAlert(false), 2000);
}

async function sendMailRequest(email, message) {
    const data = {
        email: email,
        message: message,
    };

    try {
        const response = await fetch("https://formspree.io/f/xrbajdde", {
            method: "POST",
            body: new FormData(form),
            headers: {
                Accept: "application/json",
            },
        });

        if (response.ok) {
            scheduleAlert(
                () => showSuccessAlert("Thanks for sending the messages"),
                2000
            );
            form.reset();
        } else {
            scheduleAlert(() => showErrorAlert("Something went wrong!"), 2000);
        }
    } catch (e) {
        scheduleAlert(() => showErrorAlert("Something went wrong!"), 2000);
        console.log(e);
    }
}
