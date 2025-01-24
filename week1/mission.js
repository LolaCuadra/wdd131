// change theme

//  Check to see what option is currently selected on our theme selector.
// If it is "dark" then add the dark class to body and change the logo image src to the white logo.
// If it is not "dark" then remove the dark class from the body element and change the logo image src for the logo to the blue logo.

const themeSelector = document.querySelector(".theme");
const logo = document.querySelector("footer img");

function changeTheme() {
// check to see what the current value of our select is.
// The current value is conveniently found in themeSelector.value!
const selectedTheme = themeSelector.value;
// if the value is dark then:
// add the dark class to the body
if (selectedTheme == "dark"){
    document.body.classList.add("dark");
    logo.src = "./byui-logo_white.png";
    // otherwise
} else {
    // remove the dark class
    document.body.classList.remove("dark");
    // make sure the logo src is the blue logo.
    logo.src = "./byui-logo_blue.webp"; 
}
// add an event listener to the themeSelector element here.

// Use the changeTheme function as the event handler function.
themeSelector.addEventListener('change', changeTheme);