//run sound
var runSound = new Audio("run.mp3");
runSound.loop = true;
//jump sound
var jumpSound = new Audio("jump.mp3");
//dead sound 
var deadSound = new Audio("dead.mp3");


//key event
function keyCheck(event) {
    //enter
    if (event.which == 13) {
        if (runWorkerId == 0) {

            runWorkerId = setInterval(run, 100);
            runSound.play();
            moveBackgroundWorkerId = setInterval(background, 100);
            createBlockWorkerId = setInterval(createBlock, 100);
            moveBlockWorkerId = setInterval(moveBlock, 100);
            scoreWorkerId = setInterval(score, 100);
        }
    }

    //space
    if (event.which == 32) {

        if (jumpWorkerId == 0) {

            clearInterval(runWorkerId); //stop run when jump
            runWorkerId = -1;
            runSound.pause();

            jumpWorkerId = setInterval(jump, 100);
            jumpSound.play();

        }
    }
}

//run animation
var player = document.getElementById("player");
var runWorkerId = 0;
var runImageNumber = 1;

function run() {

    runImageNumber++;

    if (runImageNumber == 9) {
        runImageNumber = 1;
    }
    player.src = "../assests/Run (" + runImageNumber + ").png";
}

//jump animation
var jumpWorkerId = 0;
var jumpImageNumber = 1;
var boyMarginTop = 330;

function jump() {

    jumpImageNumber++;

    //jump fly
    if (jumpImageNumber <= 7) {
        boyMarginTop = boyMarginTop - 30;
        player.style.marginTop = boyMarginTop + "px";
    }
    //jump land
    if (jumpImageNumber >= 8) {
        boyMarginTop = boyMarginTop + 30;
        player.style.marginTop = boyMarginTop + "px";
    }
    //jump image crash
    if (jumpImageNumber == 13) {
        jumpImageNumber = 1;

        clearInterval(jumpWorkerId); //stop jump after first jump
        runWorkerId = setInterval(run, 100);

        runSound.play();

        jumpWorkerId = 0; //jump again after press space


        //starting a jump
        if (scoreWorkerId == 0) {
            scoreWorkerId = setInterval(score, 100);
        }

        if (moveBackgroundWorkerId == 0) {
            moveBackgroundWorkerId = setInterval(background, 100);

        }
        if (createBlockWorkerId == 0) {
            createBlockWorkerId = setInterval(createBlock, 100);

        }
        if (moveBlockWorkerId == 0) {
            moveBlockWorkerId = setInterval(moveBlock, 100);
        }
    }
    player.src = "../assests/Jump (" + jumpImageNumber + ").png";


}
//background move
var backgroundId = document.getElementById("background");
var positionX = 0;
var moveBackgroundWorkerId = 0;

function background() {

    positionX = positionX - 20;
    backgroundId.style.backgroundPositionX = positionX + "px";

}
//create block
var blockMarginLeft = 500;
var createBlockWorkerId = 0;
var blockNumber = 1;

function createBlock() {

    var block = document.createElement("div");
    block.className = "block";
    block.id = "block" + blockNumber;

    blockNumber++;

    var gap = Math.random() * (1000 - 400) + 400;

    blockMarginLeft = blockMarginLeft + gap;
    block.style.marginLeft = blockMarginLeft + "px";

    document.getElementById("background").appendChild(block);

}
//move block
var moveBlockWorkerId = 0;

function moveBlock() {

    for (var i = 1; i <= blockNumber; i++) {

        var currentBlock = document.getElementById("block" + i);
        var currentBlockMarginLeft = currentBlock.style.marginLeft;
        var newBlockMarginLeft = parseInt(currentBlockMarginLeft) - 20;

        currentBlock.style.marginLeft = newBlockMarginLeft + "px";

        //alert(newBlockMarginLeft);
        //166-66

        if (newBlockMarginLeft < 166 & newBlockMarginLeft > 22) {

            //alert(boyMarginTop);
            //270

            if (boyMarginTop > 270) {

                clearInterval(runWorkerId);
                runSound.pause();

                clearInterval(jumpWorkerId);
                jumpWorkerId = -1;

                clearInterval(moveBlockWorkerId);
                clearInterval(createBlockWorkerId);
                clearInterval(moveBlockWorkerId);
                clearInterval(scoreWorkerId);

                deadWorkerId = setInterval(dead, 100);
                deadSound.play();
            }

        }
    }

}

//boy dead
var deadImageNumber = 1;
var deadWorkerId = 0;

function dead() {

    deadImageNumber++;

    //dead crash
    if (deadImageNumber == 11) {
        deadImageNumber = 10;

        player.style.marginTop = "330px";

        document.getElementById("endScreen").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = newScore;
    }
    player.src = "../assests/Dead (" + deadImageNumber + ").png";


}
//score
var scoreId = document.getElementById("score");
var scoreWorkerId = 0;
var newScore = 0;

function score() {
    newScore++;
    scoreId.innerHTML = newScore;
}
//page reload
function reload() {

    location.reload();

}
