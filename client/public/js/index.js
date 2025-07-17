/*
 * Check ascii code for spacebar and call goToLocation in global to change URL
 */
function checkKeyPress(e) {
  if (e.keyCode == 32) {
    goToLocation('/feed');
  }
}


document.addEventListener("load", function () {
});

document.addEventListener("keypress", checkKeyPress);

document.fade_text = document.getElementById("fade_text");
fade_text.addEventListener("click", function () {
  goToLocation('/feed');
});





