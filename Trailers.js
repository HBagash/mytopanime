/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~*\
    CONTEXT
\*~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */
/*
    VARIABLES: LINE 14 -28
    API FUNCTIONS : LINE 29 - 146
    GENERATE CARDS FUNCTIONS: LINE 147 - 199
    STORING FAVOURITES FUNCTIONS: LINE 200 - 271
    ANIMATIONS FUNCTIONS: LINE 272 - 370
    TRAILER FUNCTIONS: LINE 371 - 471
*/

/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~*\
    VARIABLES
\*~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */

//API variables
let anime;
let animeObj;
let selectedSort = "sortAll";
let selectedAnimeID;
let trailerInfo;

//Anime ranking counter variables
let rankCounter = 0;
let animationDelay = 0;

/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~*\
    API FUNCTIONS
\*~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */

//Calculates what has been searched
function searchAnime(event){

    event.preventDefault();
    const sortType = "none"
    const form = new FormData(this)
    const query = form.get("search")
    const request = new XMLHttpRequest();
    const searchResults = document.getElementById("mainCenter");
    request.open('GET', `https://api.jikan.moe/v3/search/anime?q=${query}&type=tv`);
    
    request.onreadystatechange = function () {
    if (this.readyState === 4) {
        selectedSort = "none";
        anime = JSON.parse(this.response);
        animeObj = anime.results;
        animeObj.length = 40;
        highlight(sortType)
        update(animeObj)
    }
    };
    request.send();
}
//API for topAnime
function topAnime(){
    const request = new XMLHttpRequest();
    const sortType = "sortAll"
    request.open('GET', 'https://api.jikan.moe/v3/top/anime');

    request.onreadystatechange = function () {
    if (this.readyState === 4) {
        selectedSort = "sortAll";
        anime = JSON.parse(this.response);
        animeObj = anime.top
        anime.top.length = 40;
        //console.log(animeObj)
        highlight(sortType)
        update(animeObj)
    }
    };
    request.send();
}
//API for airingAnime
function airingAnime(){
    const request = new XMLHttpRequest();
    const sortType = "sortAiring"
    request.open('GET', 'https://api.jikan.moe/v3/top/anime/1/airing');

    request.onreadystatechange = function () {
    if (this.readyState === 4) {
        selectedSort = "sortAiring";
        anime = JSON.parse(this.response);
        animeObj = anime.top
        anime.top.length = 40;
        highlight(sortType)
        update(animeObj)
    }
    };
    request.send();
}
//API for upcomingAnime
function upcomingAnime(){
    const request = new XMLHttpRequest();
    const sortType = "sortUpcoming"
    request.open('GET', 'https://api.jikan.moe/v3/top/anime/1/upcoming');

    request.onreadystatechange = function () {
    if (this.readyState === 4) {
        selectedSort = "sortUpcoming"
        anime = JSON.parse(this.response);
        animeObj = anime.top
        anime.top.length = 40;
        highlight(sortType)
        console.log(animeObj)
        update(animeObj)
    }
    };
    request.send();
}
//API for popularAnime
function popularAnime(){
    const request = new XMLHttpRequest();
    const sortType = "sortPopular"
    request.open('GET', 'https://api.jikan.moe/v3/search/anime?q=&order_by=members');

    request.onreadystatechange = function () {
    if (this.readyState === 4) {
        selectedSort = "sortPopular";
        anime = JSON.parse(this.response);
		
        animeObj = anime.results;
        //console.log(animeObj)
        anime.results.length = 40;
        highlight(sortType)
        update(animeObj)
		//console.log(animeObj)
    }
    };
    request.send();
}
//Checks if there are any favourited animes
function favouriteAnime(){
    const sortType = "sortFavourite"
    let userData = JSON.parse(localStorage.getItem("userInformation"));
    const userDataParse = userData[userDataIndex].favouriteAnime;
    //Checks if you have any favourites
    if (userDataParse.length !== 0) {
        selectedSort = "sortFavourite";
        highlight(sortType)
        update(userDataParse)
    } else {
        alert("You do not have any favourite animes")
    }
}

/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~*\
    GENERATE CARDS FUNCTIONS
\*~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */

//Creates a Card
function update(animedata){ 
    rankCounter = 0;
    animationDelay = 0;
    document.getElementById("mainCenter").innerHTML = `
    ${animedata.map(animeTemplate).join("")}
    `
}
//For searching
function pageLoaded(){
    const form = document.getElementById("search-container")
    form.addEventListener("submit", searchAnime)
}
window.addEventListener("load", pageLoaded)
//Template for the Card
function animeTemplate(animedata) {
    rankCounter++;
    animationDelay = animationDelay + 50;
    let animeRank = "";
    let animePlayButton = `play-${animedata.mal_id}`;
    animations(animedata.mal_id);
    
    //Calls favourite Checker
    setTimeout(() => {favouritesChecker(animedata)}, 1);

        return `
        <div class="animeContainerDiv" id="${animedata.mal_id}" onmouseover="onMouseOverPlayButton(${animedata.mal_id})" onmouseout="onMouseOverExitPlayButton(${animedata.mal_id})">
            <div class="animeImageDiv" onmouseout="onMouseExitImage(${animedata.mal_id})" onmouseover="onMouseOverImage(${animedata.mal_id})" onclick="trailer(${animedata.mal_id})">
                <img src="${animedata.image_url}" alt="" class="animeImage" id="image-${animedata.mal_id}">
            </div>
            <p class="animeRank" onmouseover="onMouseOverImage(${animedata.mal_id})">#${rankCounter}</p>
            <div class="animeDescriptionDiv">
                <div class="animeTitleDiv">
                    <a href="${animedata.url}" class="animeTitle" target=”_blank”>${animedata.title}</a>
                </div>
                <p class="animeScore">Score: ${animedata.score}</p>
                <p class="animeEpisodes">${animedata.episodes}ep</p>
            </div>
            <div class="playButtonDiv">
                <img src="Assets/play.png" class="playButton" id="${animePlayButton}" onmouseover="onMouseOverImage(${animedata.mal_id})" onclick="trailer(${animedata.mal_id})">
            </div>
            <div>
                <img src="Assets/Favourite.png" class="favouriteImage" id="favourite-${animedata.mal_id}" onmouseover="favouriteHover(this.id)" onmouseout="favouriteHoverOut(this.id)" onclick="grabAnime(${animedata.mal_id})">
            </div>
        </div>

    `
}

/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~*\
    STORING FAVOURITES FUNCTIONS
\*~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */

//Grabs anime's stats when the favourite button is clicked.
function grabAnime(grabbedAnimeID){
    const request = new XMLHttpRequest();
    request.open('GET', `https://api.jikan.moe/v3/anime/${grabbedAnimeID}`);

    request.onreadystatechange = function () {
    if (this.readyState === 4) {
        anime = JSON.parse(this.response);
        storeFavourite(anime)
    }
    };
    request.send();
}
//Updates new favourites
function storeFavourite(animedata){
    //Grabs User Profile Data
    let userData = JSON.parse(localStorage.getItem("userInformation"));
    let favouriteAnimeArray = userData[0].favouriteAnime
    let favouriteImage = document.getElementById(`favourite-${animedata.mal_id}`)
    let animeIDMatchCheck = e => e.mal_id == animedata.mal_id;

    //Checks if the anime is already favourited or not.
    if (userData[userDataIndex].favouriteAnime.some(animeIDMatchCheck) === false) {
        favouriteImage.style.opacity = 0;
        setTimeout(() => {
            favouriteImage.src = "Assets/Favourited.png";
            favouriteImage.style.opacity = 1
        },150);
        userData[userDataIndex].favouriteAnime.push({
            mal_id: animedata.mal_id,
            episodes: animedata.episodes,
            image_url: animedata.image_url,
            score: animedata.score,
            title: animedata.title,
            url: animedata.url
        });
        //Checks if an anime is already favourited
    } else if (userData[userDataIndex].favouriteAnime.some(animeIDMatchCheck) === true) {
        favouriteImage.src = "Assets/Favourite.png";
        //Removes anime from local storage
        favouriteAnimeArray.splice(favouriteAnimeArray.findIndex(animeIDMatchCheck),1);
        //Checks if the Favourites is selected (if so, it will remove it from the list)
        if (selectedSort === "sortFavourite") {
            let animeCard = document.getElementById(animedata.mal_id);
            animeCard.style.opacity = 0;
            setTimeout(() => {animeCard.remove()},200);
        }
        //Checks if the favourite list is empty
        if (userData[userDataIndex].favouriteAnime.length == 0 && selectedSort === "sortFavourite") {
            topAnime()
        }
    };

    //Updates Local Storage
    localStorage.setItem("userInformation", JSON.stringify(userData))
}
//Automatically highlights previously favourited animes
function favouritesChecker(animedata) {
    //Grabs User Profile Data
    let userData = JSON.parse(localStorage.getItem("userInformation"));

    let favouriteImage = document.getElementById(`favourite-${animedata.mal_id}`)
    let animeIDMatchCheck = e => e.mal_id == animedata.mal_id;

    if (userData[userDataIndex].favouriteAnime.some(animeIDMatchCheck) === true) {
        favouriteImage.src = "Assets/Favourited.png";
    };
}

/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~*\
    ANIMATIONS FUNCTIONS
\*~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */

//Highlights the selected sort filter
function highlight(sortType) {
    const animeClass= document.getElementsByClassName("animeSortItems");
    if (sortType==="none") {
        document.getElementById("sortAll").style.color = "var(--text)";
        document.getElementById("sortPopular").style.color = "var(--text)";
        document.getElementById("sortAiring").style.color = "var(--text)";
        document.getElementById("sortUpcoming").style.color = "var(--text)";
        document.getElementById("sortFavourite").style.color = "var(--text)";
    } else if (sortType !== "none") {
        document.getElementById("sortAll").style.color = "var(--text)";
        document.getElementById("sortPopular").style.color = "var(--text)";
        document.getElementById("sortAiring").style.color = "var(--text)";
        document.getElementById("sortUpcoming").style.color = "var(--text)";
        document.getElementById("sortFavourite").style.color = "var(--text)";
        document.getElementById(sortType).style.color = "hsl(240, 75%, 77%)";
    }
}
//Animations when you hover over the favourite button
function favouriteHover(favouriteID){
    document.getElementById(favouriteID).style.transform = "scale(1.5)"
};
//Animations when you stop hovering over the favourite button
function favouriteHoverOut(favouriteID){
    document.getElementById(favouriteID).style.transform = "scale(1)"
};
//Card Animations
function animations(animeID){
    setTimeout(() => {document.getElementById(animeID).style.opacity = "1"}, animationDelay + 100);
    setTimeout(() => {document.getElementById(animeID).style.transform = "translate(0px, 0px)"}, animationDelay + 100);
    setTimeout(() => {document.getElementById(animeID).style.transition = "0.3s"}, animationDelay + 150);
}
//Displays the play icon when hovering over a card
function onMouseOverPlayButton(playButtonID) {
    let playButton = `play-${playButtonID}`
    document.getElementById(playButton).style.height = "50px";
    document.getElementById(playButton).style.width = "50px";
    document.getElementById(playButtonID).style.transform = "scale(1.1)";
    document.getElementById(playButtonID).style.transform = "scale(1.1)";
}
//Removes the play icon when you stop hovering over a card
function onMouseOverExitPlayButton(playButtonID) {
    let playButton = `play-${playButtonID}`
    document.getElementById(playButton).style.height = "0px";
    document.getElementById(playButton).style.width = "0px";
    document.getElementById(playButtonID).style.transform = "scale(1)";
}
//Magnifies the anime image when hovering over it
function onMouseOverImage(animeImageID) {
    let imageID = `image-${animeImageID}`
    document.getElementById(imageID).style.transform = "scale(1.1)";
}
//Stops image from re-sizing down when hovering over play icon
function onMouseExitImage(animeImageID) {
    let imageID = `image-${animeImageID}`
    document.getElementById(imageID).style.transform = "scale(1)";
}
//Sort text rollover when hovered over it
function onMouseOverSort(sortID) {
    if (sortID !== selectedSort) {
        document.getElementById(sortID).style.color = "hsl(240, 75%, 77%)";
        document.getElementById(sortID).style.transition = "0.3s";
    }
}
//Sort text rollover when you stop hovering over it
function onMouseExitSort(sortID) {
    if (sortID !== selectedSort) {
        document.getElementById(sortID).style.color = "var(--text)";
        document.getElementById(sortID).style.transition = "0.3s";
    }
}
//Sort Items Animations
function sortAnimationLoad() {
    setTimeout(() => {document.getElementById("sortAll").style.transform = "translate(0px, 0px)"}, 100);
    setTimeout(() => {document.getElementById("sortPopular").style.transform = "translate(0px, 0px)"}, 100);
    setTimeout(() => {document.getElementById("sortUpcoming").style.transform = "translate(0px, 0px)"}, 100);
    setTimeout(() => {document.getElementById("sortAiring").style.transform = "translate(0px, 0px)"}, 100);
    setTimeout(() => {document.getElementById("sortFavourite").style.transform = "translate(0px, 0px)"}, 100);
    setTimeout(() => {document.getElementById("Search-Box-Div").style.transform = "translate(0px, 0px)"}, 100);
    
    setTimeout(() => {document.getElementById("sortAll").style.opacity = "1"}, 100);
    setTimeout(() => {document.getElementById("sortPopular").style.opacity = "1"}, 100);
    setTimeout(() => {document.getElementById("sortUpcoming").style.opacity = "1"}, 100);
    setTimeout(() => {document.getElementById("sortAiring").style.opacity = "1"}, 100);
    setTimeout(() => {document.getElementById("sortFavourite").style.opacity = "1"}, 100);
    setTimeout(() => {document.getElementById("Search-Box-Div").style.opacity = "1"}, 100);
    
    setTimeout(() => {document.getElementById("sortAll").style.transition = "all 160ms cubic-bezier(.38,.32,.25,1)"}, 200);
    setTimeout(() => {document.getElementById("sortPopular").style.transition = "all 160ms cubic-bezier(.38,.32,.25,1)"}, 200);
    setTimeout(() => {document.getElementById("sortUpcoming").style.transition = "all 160ms cubic-bezier(.38,.32,.25,1)"}, 200);
    setTimeout(() => {document.getElementById("sortAiring").style.transition = "all 160ms cubic-bezier(.38,.32,.25,1)"}, 200);
    setTimeout(() => {document.getElementById("sortFavourite").style.transition = "all 160ms cubic-bezier(.38,.32,.25,1)"}, 200);
    setTimeout(() => {document.getElementById("Search-Box-Div").style.transition = "all 160ms cubic-bezier(.38,.32,.25,1)"}, 200);
}

/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~*\
    TRAILER FUNCTIONS
\*~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */

//Finds an availble trailer for an anime
function trailer(animeID) {
    let videoObj;
    const request = new XMLHttpRequest();
    request.open('GET', `https://api.jikan.moe/v3/anime/${animeID}/videos`);
    selectedAnimeID = animeID;
    request.onreadystatechange = function () {
    if (this.readyState === 4) {
        animeTrailer = JSON.parse(this.response);
        videoObj = animeTrailer.promo;
        //Checks if there is a trailer available
        if (animeTrailer.promo.length===0) {
            alert("This anime does not have any trailers.")
        } else if (animeTrailer.promo.length>0){
        animeTrailer.promo.length = 1;
        trailerInformation(videoObj);
        document.getElementById("videoDiv").style.display = "flex";
        }
    }
    };
    request.send();
}
//API to gather Trailer Information before displaying the trailer
function trailerInformation(trailerObj) {
    let videoObj;
    const request = new XMLHttpRequest();
    request.open('GET', `https://api.jikan.moe/v3/anime/${selectedAnimeID}`);

    request.onreadystatechange = function () {
    if (this.readyState === 4) {
        let animeTrailerInfo = JSON.parse(this.response);
        videoObj = animeTrailerInfo;
        trailerInfo = videoObj;
        videoUpdate(trailerObj)
    }
    };
    request.send();
}

//Template for the trailer
function videoTemplate(videodata) {
    console.log(trailerInfo);

    //Generates "Genres" string
    const genres = trailerInfo.genres;
    let genresString = "";
    genres.forEach(element => genresString = genresString + ", " +element.name);
    genresString = genresString.substring(2)
    console.log(genresString)

    //Generates "Studios" string
    const studio = trailerInfo.studios;
    let studioString = "";
    studio.forEach(element => studioString = studioString + ", " +element.name);
    studioString = studioString.substring(2)
    console.log(studioString)

    return `
    <iframe id="animeTrailerVideo" width="560" height="315" src="${videodata.video_url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                <div class="trailerDescription">
                    <div class="trailerSynopsis">
                        <h2 class="trailerText" style="text-shadow: -5px 5px rgb(0 0 0 / 35%);">Synopsis</h2>
                        <p class="trailerText" style="max-width:95%;">${trailerInfo.synopsis}</p>
                    </div>

                    <h2 class="trailerText" style="text-shadow: -5px 5px rgb(0 0 0 / 35%); width: 240px;">${trailerInfo.title}</h2>

                    <div class="trailerInformation" style="max-width: 240px;">
                        <p class="trailerText"><strong>Type:</strong> ${trailerInfo.type}</p>
                        <p class="trailerText"><strong>Episodes:</strong> ${trailerInfo.episodes}</p>
                        <p class="trailerText"><strong>Status:</strong> ${trailerInfo.status}</p>
                        <p class="trailerText"><strong>Aired:</strong> ${trailerInfo.aired.string}</p>
                        <p class="trailerText"><strong>Premiered:</strong> ${trailerInfo.premiered}</p>
                        <p class="trailerText"><strong>Genres:</strong> ${genresString}</p>
                        <p class="trailerText"><strong>Studios:</strong> ${studioString}</p>
                    </div>

                </div>
    `
}
//Creates a trailer
function videoUpdate(videoData){ 
    document.getElementById("trailerContainer").innerHTML = `
    ${videoData.map(videoTemplate).join("")}
    `
}
//Closes the trailer
function closeTrailer() {
    if (document.getElementById("animeTrailerVideo")) {
        document.getElementById("animeTrailerVideo").remove()
    }
    document.getElementById("videoDiv").style.display = "none"
}

//Loads the page with "topAnime"
topAnime()
sortAnimationLoad()