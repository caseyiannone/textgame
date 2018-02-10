const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0,0,0,0];
var interval;
var timerRunning = false;
// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time){
  if(time <= 9){
    time = "0" + time;
  }
  return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
  let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
  theTimer.innerHTML = currentTime;
  timer[3] ++;
  timer[0] = Math.floor((timer[3]/100)/60);
  timer[1] = Math.floor((timer[3]/100) - (timer[0]*60));
  timer[2] = Math.floor((timer[3] - (timer[1] *100) - timer[0]*6000));
}

//Creates a function to perform a string comparison of what is entered in the text box to that shown on the page:
function spellCheck(){
  let textEntered = testArea.value;
  let originTextMatch = originText.substring(0,textEntered.length);

  if (textEntered == originText){
    clearInterval(interval);
    testWrapper.style.borderColor = "green";
  } else {
      if (textEntered == originTextMatch){
        testWrapper.style.borderColor = "blue";
      } else {
        testWrapper.style.borderColor = "red";
      }
    }
}

// Start the timer:
function start() {
  let textEnteredLength = testArea.value.length;
  if (textEnteredLength === 0 && !timerRunning){
    timerRunning = true;
    interval = setInterval(runTimer, 10);
  }
  /* test to ensure function is grabbing lenght of text entered into box
  console.log(textEnteredLength)
  */
}

// Reset everything:
function reset() {
  clearInterval(interval);
  interval = null;
  timer = [0,0,0,0];
  timerRunning = false;

  testArea.value = "";
  theTimer.innerHTML = "00:00:00";
  testWrapper.style.borderColor="grey";
  /* Test to make sure event listener for button is functioning properly
  console.log("You've clicked the reset button.");
  */
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress",start,false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
