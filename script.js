

let score = 0;
let cross = true;
audio = new Audio(`./assets/gameStart.mp3`)
audioGo = new Audio(`./assets/gameOver.wav`)
setTimeout(() => {
    audio.loop = true;
    audio.play();
}, 4000);

let Demon = document.querySelector(`.Demon`);
let superHero = document.querySelector(`.superHero`);
let scoreCount = document.querySelector('.scoreCount');
let restart = document.querySelector('#reload-page');


document.onkeydown = function(e){
    console.log("key code is ", e.keyCode)
    if(e.keyCode == 38){
        superHero.classList.add(`animateHero`);
        setTimeout(() =>{
            superHero.classList.remove(`animateHero`)
        }, 900);
    }
    if(e.keyCode == 39){
        superHeroX =  parseInt(window.getComputedStyle(superHero, null).getPropertyValue(`left`));
        superHero.style.left = superHeroX + 112 + "px";
    }
    if(e.keyCode == 37){
        superHeroX =  parseInt(window.getComputedStyle(superHero, null).getPropertyValue(`left`));
        superHero.style.left = (superHeroX - 112) + "px";
    }
}

setInterval(() =>{
    gameOver = document.querySelector(`.gameOver`);
    Demon = document.querySelector(`.Demon`);

    sx = parseInt(window.getComputedStyle(superHero, null).getPropertyValue(`left`));
    sy = parseInt(window.getComputedStyle(superHero, null).getPropertyValue(`top`));
    dx = parseInt(window.getComputedStyle(Demon, null).getPropertyValue(`left`));
    dy = parseInt(window.getComputedStyle(Demon, null).getPropertyValue(`top`));

    offsetX = Math.abs(sx-dx);
    offsetY = Math.abs(sy-dy);

    if(offsetX < 90 && offsetY < 140){
        restart.addEventListener('click' , function(){
            window.location.reload();
        });
        restart.removeAttribute('hidden');
        gameOver.innerHTML = "Game Over - Reload to play again";
        Demon.classList.remove(`DemonAni`)
        audioGo.play();
        setTimeout(() =>{
            audioGo.pause();
            audio.pause();
           
        },1000)
    }
    else if( offsetX < 130 && cross){
        score +=1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
          cross = true;
        },1000);
   
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(Demon, null).getPropertyValue(`animation-duration`));
            newDur = aniDur - 0.1;
            Demon.style.animationDuration = newDur + `s`;

        }, 500);
       
        
    }
}, 10);

function updateScore(score){
    scoreCount.innerHTML = "your score: " + score
}
