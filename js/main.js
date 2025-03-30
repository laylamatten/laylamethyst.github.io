const loadingScreen = document.querySelector("#loading-screen")
const txtMoving = document.querySelector(".txt-moving");
const imgHero = document.querySelector("#hero");
const btnDiscover = document.querySelector("#cta-btn");
const txtLikeDislike = document.querySelector("#like-dislike");
const imgProject = document.querySelector(".img-project");
const btnLike = document.querySelector("#like");
const btnDislike = document.querySelector("#dislike");
const imgSlide = document.querySelector("#imgSlide");
const bar = document.querySelector("#loading-bar");
const barText = document.querySelector("#bar-text");
const imgProgress = document.querySelector("#imgProgress");
const btnTop = document.querySelector("#btn-top");

var projectImages = document.querySelectorAll(".img-project");
var easterEggs = document.querySelectorAll(".easter-egg");
var modal = document.querySelector("#modal");
var socials = document.querySelectorAll(".socials");

let likes = 0;
let dislikes = 0;
let eggsFound = 0;
let imgNbr = 0;
let progressNbr = 0;
let currProgress = 0;

const clicks = [
    {isClicked: false},
    {isClicked: false},
    {isClicked: false},
    {isClicked: false},
    {isClicked: false},
    {isClicked: false},
    {isClicked: false},
    {isClicked: false}
];
const ocs = [
    {image: "assets/oc1.jpg"},
    {image: "assets/oc2.jpg"},
    {image: "assets/oc3.jpg"},
    {image: "assets/oc4.jpg"}
];
const progress = [
    {image: "assets/fant1.jpg"},
    {image: "assets/fant2.jpg"},
    {image: "assets/fant3.jpg"},
    {image: "assets/fant4.jpg"}
];
const eggs = [
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0}
];

// ONLOAD
document.addEventListener("DOMContentLoaded", function(){
    onLoad();
});
// OnLoad Function
function onLoad(){
    timerLoadingScreen();
    movingBanner();
    findEggs();
    biggerImage();
    resetImage();
    clickImage();
    slideImages();
    clickSocials();
    scatterEggs();
    manageProgress();
}

// BUTTONS
// Clicks
btnDiscover.addEventListener("click", function(){
    btnDiscover.style.transform = "translate(" + 0 + "px," + 5 + "px)";
    setTimeout(() => {
        window.location.href = "index.html#projects";
    }, 1000);
    console.log("button hit");
    resetButton(btnDiscover);
});
btnLike.addEventListener("click", function(){
    likes++;
    modal.classList.remove("active");
    updateHeader();
    updateLikeDislike();
});
btnDislike.addEventListener("click", function(){
    dislikes++;
    modal.classList.remove("active");
    updateHeader();
    updateLikeDislike();
});
// Knop Hovereffect
function btnHover(btn){
    btn.style.background = "#3e7484";
}
// Knop Hovereffect Release
function btnRelease(btn){
    btn.style.background = "#649aa9";
}
// Knop Reset
function resetButton(btn){
    setTimeout(() => {
        btn.style.transform = "translate(" + 0 + "px," + (-2.5) + "px)"
    }, 500);
}
// Gebruik Functies
btnDiscover.addEventListener("mouseover", function(){
    console.log("button hovered");
    btnHover(btnDiscover);
});
btnDiscover.addEventListener("mouseout", function(){
    btnRelease(btnDiscover);
});
btnTop.addEventListener("mouseover", function(){
    btnHover(btnTop);
});
btnTop.addEventListener("mouseout", function(){
    btnRelease(btnTop);
});
btnLike.addEventListener("mouseover", function(){
    btnHover(btnLike);
});
btnLike.addEventListener("mouseout", function(){
    btnRelease(btnLike);
});
btnDislike.addEventListener("mouseover", function(){
    btnHover(btnDislike);
});
btnDislike.addEventListener("mouseout", function(){
    btnRelease(btnDislike);
});
btnTop.addEventListener("click", function(){
    btnTop.style.transform = "translate(" + 0 + "px," + 5 + "px)";
    setTimeout(() => {
        window.location.href = "index.html#projects";
    }, 1000);
    resetButton(btnTop);
});

// IMAGES
// Click Image
function clickImage(){
    projectImages.forEach((img, i) => {
        img.addEventListener("click", function(){
            if(!clicks[i].isClicked){
                console.log(clicks[i].isClicked);
                modal.classList.add("active");
                clicks[i].isClicked=true;
            }
            else{
                window.alert("Piece is already rated.");
            }
        })
    });
}
// Make Image Bigger
function biggerImage(){
    projectImages.forEach(img => {
        img.addEventListener("mouseover", function(){
            img.classList.add("selected");
        })
    });
}
// Reset Image
function resetImage(){
    projectImages.forEach(img => {
        img.addEventListener("mouseout", function(){
            img.classList.remove("selected");
        })
    });
}
// Image Slideshow
function slideImages(){
    setInterval(() => {
        if(imgNbr>=(ocs.length-1)){
            imgNbr = 0;
        }else{
            imgNbr++;
        }
        imgSlide.src = ocs[imgNbr].image; 
        console.log(imgNbr);
    }, 2200);
}
// Click Socials
function clickSocials(){
    socials.forEach(social => {
        social.addEventListener("click", function(){
            const url = social.getAttribute("data-url");
            window.open(url, "_blank");
        })
    });
}
// Process Images
function manageProgress(){
    imgProgress.addEventListener("click", function(){
        if(progressNbr>=(progress.length-1)){
            currProgress=0;
            progressNbr = 0;
            resetProgress();
        }else{
            progressNbr++;
            updateProgress();
        }
        imgProgress.src = progress[progressNbr].image;
        barText.innerHTML = Math.round(currProgress) + "%";
    });
}
// Progress Bar
// currProgress line used AI
function updateProgress(){
    currProgress = (progressNbr / (progress.length - 1)) * 100;
    bar.style.width = currProgress+"%"; 
}
function resetProgress(){
    bar.style.width="0%";
}

// EASTER EGGS
// Easter Egg Hunt
function findEggs(){
    easterEggs.forEach(egg => {
        egg.addEventListener("click", function(){
            console.log("egg hit")
            egg.classList.add("hidden");
            eggsFound++;
            updateHeader();
            if(eggsFound===eggs.length){
                console.log("all eggs found");
                allEggsFound();
            }
        });
    });
}
// Scatter Easter Eggs to Random Positions
function getRdmPos(){
    return Math.floor(Math.random() * (window.innerWidth - 50));
}
function getRdmPosY(){
    return Math.floor(Math.random() * (document.documentElement.scrollHeight - 50));
}
function scatterEggs(){
    // AI voor de ",i" and to get the scrollWidth and Height
    eggs.forEach((egg, i) => { 
        egg.x = getRdmPos();
        egg.y = getRdmPosY();
        easterEggs[i].style.position = "absolute";
        easterEggs[i].style.top = egg.y+"px";
        easterEggs[i].style.left = egg.x+"px";
    });
}
function allEggsFound(){
    console.log("easter egg triggered");
    projectImages.forEach(img => {
        img.classList.add("spinning");
        setTimeout(() => {
            img.classList.remove("spinning");
        }, 2000);
    });
}
window.addEventListener("resize", function(){
    eggs.forEach((egg, i) => {
        egg.x = getRdmPos();
        egg.y = getRdmPosY();
        easterEggs[i].style.left = egg.x+"px";
        easterEggs[i].style.top = egg.y+"px";
    })
});

// OTHERS
// Update Text
function updateHeader(){
    txtMoving.innerHTML = "WELCOME, YOU HAVE FOUND " + eggsFound + "/7 EASTER EGGS " + likes + " LIKES " + dislikes + " DISLIKES";
}
function updateLikeDislike(){
    txtLikeDislike.innerHTML = likes + " pieces liked and " + dislikes + " pieces disliked"; 
}
// Loading Screen
function timerLoadingScreen(){
    setTimeout(() => {
        loadingScreen.style.visibility = "hidden";
    }, 3000);
}
// Banner Movement
function movingBanner(){
    const scrollContainer = screen.width;
    let scrollAmount = 0;
    setInterval(() => {
        scrollAmount += 5;
        txtMoving.style.transform = "translate(" + scrollAmount + "px," + 0 + "px)";
        if (scrollAmount >= scrollContainer){
            scrollAmount = 0;
        }
    }, 70);
}