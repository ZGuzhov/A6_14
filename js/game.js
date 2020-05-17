const numDivs = 36;
const maxHits = 10;

let hits = 0;
let hitsMiss = 0;
let firstHitTime = 0;
let gameStart = false;
let divSelector;
let divSelectorOld;
let divSelectorMissOld;

function round() {
  $(divSelector).removeClass("target");
  $(divSelector).text("");

  divSelectorOld = divSelector;
  divSelector = randomDivId();
  
  // устраняю вероятность выпадения того же слота, а то кажется что игра тупит,
  // если такое происходит, да и не логично тыкать два раза подряд в один и тот же слот
  while (divSelectorOld === divSelector) {
    divSelector = randomDivId();
  }

  $(divSelector).addClass("target");
  $(divSelector).text(hits + 1);
  
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $(".pole").hide();

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-hits").text(hits + hitsMiss);
  $("#total-miss").text(hitsMiss);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  $(divSelectorMissOld).removeClass("miss");
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  } else {
    if (gameStart) { // блокирую действие до начала игры
      $(event.target).addClass("miss");
      divSelectorMissOld = event.target;
      hitsMiss = hitsMiss + 1;
    }
  }
}

function init() {
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    $(".pole").show();
      $(divSelector).removeClass("target");
    hits = 0;
    hitsMiss = 0;
    firstHitTime = 0;
    gameStart = true;
    $("#win-message").addClass("d-none");
    firstHitTime = getTimestamp();

    round();
  });
}

$(document).ready(init);
