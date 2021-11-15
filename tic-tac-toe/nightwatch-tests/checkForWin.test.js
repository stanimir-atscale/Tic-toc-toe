module.exports = {
  tags: ["firstWin"],
  "Player win and check result"(browser) {
    const firstPlayerWinsEl = ".ttt-game-info-container .ttt-game-info-component:first-child .ttt-player-wins";
    let isWinsChange = false;
    let wins;

    browser
      .url("http://localhost:3000/")
      .waitForElementVisible(".ttt-game-component")
        .getText(firstPlayerWinsEl, function(winsObj) {
          wins = parseInt(winsObj.value);
        })
      .click(".cell--0 label")
      .click(".cell--3 label")
      .click(".cell--1 label")
      .click(".cell--4 label")
      .click(".cell--2 label")
      .waitForElementVisible(".ttt-endgame")
      .click(".ttt-tryAgain")
      .getText(firstPlayerWinsEl, function(winsObj) {
        if(wins < parseInt(winsObj.value)){
            isWinsChange = !isWinsChange;
        }
      })
      .perform(function () {
        this.assert.ok(isWinsChange, "Wins are correct!");
      })
      .end();
  }
};
