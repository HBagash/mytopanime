//Lightmode Checkbox
const checkbox = document.getElementById("lightModeCheckbox");

//Auto sets previously selected accessabilities for returning users
if (localStorage.getItem("mode") === "lightMode") {
    document.body.classList.toggle("lightMode"); 
    checkbox.checked = true;
}

//Changes Themes
function lightMode() {
    document.body.classList.toggle("lightMode")
    if (document.body.classList.contains("lightMode")) {
        localStorage.setItem("mode", "lightMode")
    }else {
        localStorage.setItem("mode", "darkMode")
    }
}

//Generates user profiles for new users
let userDataIndex = 0;
let userData = localStorage.getItem("userInformation");

//Checks for existing profiles
if (JSON.parse(userData) === null) {
    let userInfo = [
        {
        id: 1,
        username: "User1",
        password: "Password1",
        favouriteAnime: []
        }
    ];
    localStorage.setItem("userInformation", JSON.stringify(userInfo));
}