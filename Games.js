//Variable to store currently displayed game
let selectedGame;

//Displays codeVein
function codeVein() {
    const gameType = "codeVein";
	selectedGame = "codeVein";
	highlight(gameType);
    document.getElementById("gamesDiv").style.transform = "translate(-10px)"
}

//Displays Persona 5
function persona5() {
    const gameType = "persona5";
	selectedGame = "persona5";
	highlight(gameType);
    document.getElementById("gamesDiv").style.transform = "translate(-1745px)"
}

//Displays Steins;Gate
function steinsGate() {
    const gameType = "steinsGate";
	selectedGame = "steinsGate";
	highlight(gameType);
    document.getElementById("gamesDiv").style.transform = "translate(-3480px)"
}

//Displays Scarlet Nexus
function scarletNexus() {
    const gameType = "scarletNexus";
	selectedGame = "scarletNexus";
	highlight(gameType);
    document.getElementById("gamesDiv").style.transform = "translate(-5215px)"
}

//Next button for game gallery
function next() {
    if (selectedGame === "codeVein") {
        persona5()
    }
    else if (selectedGame === "persona5") {
        steinsGate()
    }
    else if (selectedGame === "steinsGate") {
        scarletNexus()
    }
    else if (selectedGame === "scarletNexus") {
        codeVein()
    }
}

//Previous button for game gallery
function previous() {
    if (selectedGame === "codeVein") {
        scarletNexus()
    }
    else if (selectedGame === "persona5") {
        codeVein()
    }
    else if (selectedGame === "steinsGate") {
        persona5()
    }
    else if (selectedGame === "scarletNexus") {
        steinsGate()
    }
}

//Highlights the selected game
function highlight(gameType) {
    const gameClass= document.getElementsByClassName("animeGameItems");
    if (gameType==="none") {
        document.getElementById("codeVein").style.color = "var(--text)";
        document.getElementById("persona5").style.color = "var(--text)";
        document.getElementById("steinsGate").style.color = "var(--text)";
        document.getElementById("scarletNexus").style.color = "var(--text)";
    } else if (gameType !== "none") {
        document.getElementById("codeVein").style.color = "var(--text)";
        document.getElementById("persona5").style.color = "var(--text)";
        document.getElementById("steinsGate").style.color = "var(--text)";
        document.getElementById("scarletNexus").style.color = "var(--text)";
        document.getElementById(gameType).style.color = "hsl(240, 75%, 77%)";
    }
}
//Game text rollover when hovered over it
function onMouseOverGame(gameID) {
    if (gameID !== selectedGame) {
        document.getElementById(gameID).style.color = "hsl(240, 75%, 77%)";
        document.getElementById(gameID).style.transition = "0.3s";
    }
}
//Game text rollover when you stop hovering over it
function onMouseExitGame(gameID) {
    if (gameID !== selectedGame) {
        document.getElementById(gameID).style.color = "var(--text)";
        document.getElementById(gameID).style.transition = "0.3s";
    }
}
//Game navigation text Animations
function gameAnimationLoad() {
    setTimeout(() => {document.getElementById("codeVein").style.transform = "translate(0px, 0px)"}, 100);
    setTimeout(() => {document.getElementById("persona5").style.transform = "translate(0px, 0px)"}, 100);
    setTimeout(() => {document.getElementById("steinsGate").style.transform = "translate(0px, 0px)"}, 100);
    setTimeout(() => {document.getElementById("scarletNexus").style.transform = "translate(0px, 0px)"}, 100);
    setTimeout(() => {document.getElementById("gamesDivContainer").style.transform = "translate(0px)"}, 100);
     
    setTimeout(() => {document.getElementById("codeVein").style.opacity = "1"}, 100);
    setTimeout(() => {document.getElementById("persona5").style.opacity = "1"}, 100);
    setTimeout(() => {document.getElementById("steinsGate").style.opacity = "1"}, 100);
    setTimeout(() => {document.getElementById("scarletNexus").style.opacity = "1"}, 100);
    setTimeout(() => {document.getElementById("gamesDivContainer").style.opacity = "1"}, 100);
    
    setTimeout(() => {document.getElementById("codeVein").style.transition = "0.3s"}, 200);
    setTimeout(() => {document.getElementById("persona5").style.transition = "0.3s"}, 200);
    setTimeout(() => {document.getElementById("steinsGate").style.transition = "0.3s"}, 200);
    setTimeout(() => {document.getElementById("scarletNexus").style.transition = "0.3s"}, 200);
}

//Loads page animations
gameAnimationLoad()

//Ensures codeVein is selected when the page opens
codeVein()