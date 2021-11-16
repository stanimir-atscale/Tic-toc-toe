module.exports = {
  tags: ["checkGameFunctionality"],
  "Player win and check result"(browser) {
    const firstPlayerWinsEl = ".ttt-game-info-container .ttt-game-info-component:first-child .ttt-player-wins";
    let isWinsChange = false;
    let wins;

    browser
      .url("http://localhost:3000/")
      .waitForElementVisible(".ttt-game-component")
      .getText(firstPlayerWinsEl, function(winsObj) {
          wins = parseInt(winsObj.value);
          this.assert.ok(wins === 0, "Init players win count are correct!");
      })
      .click(".cell--0 label")
      .element("css selector", ".cell--0 .mark--x", function(result) {
          this.assert.ok(!result.error, "First player success click on cell!");
      })
      .click(".cell--3 label")
      .element("css selector", ".cell--3 .mark--o", function(result) {
          this.assert.ok(!result.error, "Second player success click on cell!");
      })
      .click(".cell--1 label")
      .click(".cell--4 label")
      .click(".cell--2 label")
      .waitForElementVisible(".ttt-endgame")
      .element("css selector", ".ttt-endgame", function(result) {
          this.assert.ok(!result.error, "End game modal is show correct!");
      })
      .click(".ttt-tryAgain")
      .element("css selector", ".ttt-endgame", function(result) {
          this.assert.ok(result.error, "End game modal is hide correct!");
      })
      .getText(firstPlayerWinsEl, function(winsObj) {
        if(wins < parseInt(winsObj.value)){
            isWinsChange = !isWinsChange;
        }
        this.assert.ok(isWinsChange, "Players win count are correct!");
      })
      .end();
  }
};
