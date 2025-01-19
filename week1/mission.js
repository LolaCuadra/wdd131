// change theme

//  Check to see what option is currently selected on our theme selector.
// If it is "dark" then add the dark class to body and change the logo image src to the white logo.
// If it is not "dark" then remove the dark class from the body element and change the logo image src for the logo to the blue logo.

const themeSelector = document.querySelector(".theme");
const logo = document.querySelector("footer img");

function changeTheme() {
    const selectedTheme = themeSelector.value;

    if (selectedTheme === "dark") {
        document.body.classList.add("dark");
        logo.src = "./byui-logo_white.png";
    } else {
        document.body.classList.remove("dark");
        logo.src = "./byui-logo_blue.webp";
    }
}

themeSelector.addEventListener("change", changeTheme);