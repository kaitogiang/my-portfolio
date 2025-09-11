document.addEventListener("scroll", (event) => {
    console.log(window.scrollY);
    handleArrowUpVisibility(window.scrollY);
});

// const rootStyles = getComputedStyle(document.documentElement);
// const checkIcon = rootStyles.getPropertyValue("--check-circle-icon").trim();
// const wrongIcon = rootStyles.getPropertyValue("--wrong-circle-icon").trim();

// console.log(checkIcon);
// console.log(wrongIcon);

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
