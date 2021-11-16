module.exports = {
    "Draw and check results"(browser) {
      const firstPlayerWinsEl = ".ttt-game-info-container .ttt-game-info-component:first-child .ttt-player-wins";
      const secondPlayerWinsEl = ".ttt-game-info-container .ttt-game-info-component:last-child .ttt-player-wins";
      let areWinsChange = false;
      let firstPlayerWins;
      let secondPlayerWins;      

      browser
        .url("http://localhost:3000/")
        .waitForElementVisible(".ttt-game-component")
        .getText(firstPlayerWinsEl, function(winsObj) {
            firstPlayerWins = parseInt(winsObj.value);
        })
        .getText(secondPlayerWinsEl, function(winsObj) {
            secondPlayerWins = parseInt(winsObj.value);
        })
        .click(".cell--0 label")
        .click(".cell--1 label")
        .click(".cell--4 label")
        .click(".cell--2 label")
        .click(".cell--5 label")
        .click(".cell--3 label")
        .click(".cell--6 label")
        .click(".cell--8 label")
        .click(".cell--7 label")
        .waitForElementVisible(".ttt-endgame")
        .click(".ttt-tryAgain")
        .getText(firstPlayerWinsEl, function(winsObj) {
          if (firstPlayerWins !== parseInt(winsObj.value)) {
            areWinsChange = true;
          }
        })
        .getText(secondPlayerWinsEl, function(winsObj) {
          if (secondPlayerWins !== parseInt(winsObj.value)) {
            areWinsChange = true;
          }
        })
        .perform(function () {
          this.assert.ok(!areWinsChange, "Wins count for draw are correct!");
        })
        .end();
    }
  };
  