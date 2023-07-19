var gamePattern = []; // array to keep tracking the random sequence
var userClickedPattern = []; // array to keep  tracking the user input sequence
var level = 0;
var buttonsIdArray = ["green", "yellow", "red", "blue"];// we use this array to get the #id of the button using the random numebr
var gameStarted = false;
var highestAttempt;
//step 1
// press start button to start the game
$(".start").on("click", function (e) {
    if (!(gameStarted) && level === 0)  {
        
       nextSequence(); // when we call function here the varyables change in the global also
       //step 3
// we can create a user click detection to see what button the user clicked and compare it to the game sequence

    $('.btn').on('click', function (e) {
    // console.log(e.target.id); // this will give us the id of the clicked button, i knw by using colosl(e)
    // stroting the user click to the define array at the top of the page
    var chosenColor = e.target.id; // this will give us the id of the clicked button, i knw by using colosl(e)
    userClickedPattern.push(chosenColor);
    // console.log("user choice "+userClickedPattern);
    
    //adding button click animation
    $("#"+chosenColor).addClass("pressed");
    setTimeout(function(){
        $("#"+chosenColor).removeClass("pressed");  
    },100);
    //calling the sound Function
       playSound(chosenColor); 
    
    // calling the check answer function so we can check if the user answer is correct
    checkAnswer (userClickedPattern.length-1);// the user click will start [0], then [1] and so on, we use this number and put it in both gamePattern[] and userClickPattern[]
});

    }
});


//step 2
// this function will make the random sqeunce, by showing flash animation of the button to click
function nextSequence() {
    gameStarted = true;
    // increasing th game lever each time this function gets called
    level++;
    //show the level in the h1
    $("h1 span").removeClass("start-style restart-style");
    $(".start").html("Level "+level);

    // we empty the user click array so he again entres a new sequence
    userClickedPattern = [];

    // making random number generator 0 - 3
    var randomButtonIndex = Math.floor(Math.random()*4);
    // the array of the buttons in the html is as following [green , yellow , red , blue]
    // attatching the flash animation to the buttons using the random number for the array index of the buttons
    $("#"+buttonsIdArray[randomButtonIndex]).fadeIn(100).fadeOut(100).fadeIn(100); // we can do sequnce of animation like this
    // in order to keep track of the game random pattern we need to store it in an array
    gamePattern.push(buttonsIdArray[randomButtonIndex]);
    // console.log("game pattern "+gamePattern);

    // we call the clicking function so the user can chose the color 
}



// step 4
function checkAnswer (currentArrayPostion) { // this if statmetn work beacuse each time we are putting same posion for both click and game sequence [0], [1], etc....
    if (gamePattern[currentArrayPostion] === userClickedPattern[currentArrayPostion]) {
        console.log( "current gaame pos "+gamePattern[currentArrayPostion]);
        console.log( "current click pos "+userClickedPattern[currentArrayPostion]);
             console.log("correct answer");
             if(gamePattern.length === userClickedPattern.length){
                nextSequence();
                console.log("correct")
             }
    }else { 
        // in case of wrong asnswer
        playSound("wrong")
        console.log("wrong");
        level = 0;
        userClickedPattern = [];
        gamePattern = [];

        // showing game over and gameover animation
        $("h1 span").addClass("restart-style");
         
        $(".start").html("<span>Restart!</span>");
        $("body").addClass("game-over");
        setTimeout(function () 
            {  $("body").removeClass("game-over"); 
        
            },200);
        console.log((gameStarted));


        // restarting the game 
        $("h1").on("click", function () {
            // so thie 
            if(gameStarted && level === 0) {
                nextSequence();
            }
            
        });
    
    }  
} 


function playSound(filePath){
    var audio = new Audio("./sounds/"+filePath+".mp3");
    audio.play();
}
// my goal for tommorow, store the highest level the user got,(if not possible the previous once),
// make the game over thing and the possibility to restart the game

// try to understand again how the comparison work

//back here

// do the click event 
