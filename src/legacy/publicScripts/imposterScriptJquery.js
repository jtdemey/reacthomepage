$(document).ready(function() {
  //Globals
  var localip = 'http://localhost:5260/';
  let gameState = {};
  let scenarios = [];
  let playerSlot = 0;
  let isImposter = false;
  let socketID = 0;
  let socketName = "<none>";
  let gameCode = window.location.href.split("/")[4];
  let waitingEllipsisAnimation = undefined;
  let socket = io(localip, {
    transports: ['polling', 'websocket']
  });
  console.log(socket);

  socket.on('reconnect_attempt', () => {
    socket.io.opts.transports = ['polling', 'websocket'];
  });

  window.onbeforeunload = () => {
    return "Are you sure you want to leave the game?";
    socket.close();
  }

  //Buttons
  $('.postpone-btn').on('click', () => {
    socket.emit("postpone");
    console.log("Postpone request sent");
  });

  $('.hurry-btn').on('click', () => {
    socket.emit('impatience');
    console.log("Impatience sent");
  });

  $('.new-btn').on('click', () => {
    if('replay' in gameState.votes) {
      socket.emit('voteForReplay', {
        slot: playerSlot
      });
    } else {
      socket.emit('callReplayVote', {
        slot: playerSlot
      });
    }
  });

  $('.restart-btn').on('click', () => {
    if('restart' in gameState.votes) {
      socket.emit('voteForRestart', {
        slot: playerSlot
      });
    } else {
      socket.emit('callRestartVote', {
        slot: playerSlot
      });
    }
  });

  //Setup
  socket.on('setup', (data) => {
    $('.imposter-gc').html("GAMECODE: <strong>" + gameCode + "</strong>").css("font-size","1.5em");
    socketID = data.socketId;
    socket.emit('sendGC', {
      gameCode: gameCode
    });
  });

  socket.on('playerJoin', (data) => {
    console.log(data.player.name + " has joined as P" + data.player.slot);
    playerSlot = data.player.slot;
    socketName = data.player.name;
    for(var i = 1; i <= 10; i++) {
      $('.il-li' + i).text(data.gameState.players[i]);
    }
  });

  socket.on('refreshPlayers', (data) => {
    gameState = data.gameState;
    for(var i = 1; i <= 10; i++) {
      $('.il-li' + i).text(data.gameState.players[i]);
    }
  });

  socket.on('setupPh0', (data) => {
    gameState = data.gameState;
    scenarios = data.scenarios;
    $('.il-timer').text(data.gameState.timers[0]);
    startWaitingEllipsisAnimation();
  });

  socket.on('setupPh1', (data) => {
    gameState = data.gameState;
    if(gameState.roles[playerSlot] == "Imposter") {
      isImposter = true;
    }
    for(var i = 0; i < scenarios.length; i++) {
      var locbtn = $("<button>", {id: ("scenario-btn" + i), "class": "btn btn-lg btn-block scenario-btn"});
      var currscen = scenarios[i];
      locbtn.text(currscen);
      if(isImposter) {
        locbtn.on('click', () => {
          if($(this).text() == gameState.scenario) {
            socket.emit("imposterVictory");
            console.log("Good guess... you aren't cheating, are ya?");
          } else {
            socket.emit("imposterFailure");
          }
        });
      }
      $('.imposter-scenario-list').append(locbtn);
    }
    if(isImposter) {
      $('.role-prompt').text("You're the Imposter!");
      $('.scenario-prompt').text("Try to blend in...");
    } else {
      $('.role-prompt').text("You are: " + gameState.roles[playerSlot]);
      $('.scenario-prompt').text("Scenario: " + gameState.scenario);
    }
    $('.il-ta-prompt').html("Time left:");
    $('.imposter-waiting').fadeOut();
    $('.imposter-lobby-gcp').fadeOut();
    $('.imposter-lobby-btns').fadeOut(function() {
      $('.imposter-game-view, .imposter-list-area, .imposter-game-btns').fadeIn();
    });
    $('.imposter-scenario-prompt').fadeIn(1200);
  });

  socket.on('setupPh2', (data) => {
    gameState = data.gameState;
    $('.imposter-game-view').fadeOut(() => {
      $('.timeout-view').fadeIn();
    });
  });

  socket.on('setupPh3', (data) => {
    gameState = data.gameState;
    for(var p in gameState.roles) {
      player = gameState.roles[p];
      if(player == "Imposter") {
        var imp = p;
      }
    }
    if(!imp) {
      console.log("Error in setupPh3: unable to find imposter");
    }
    $('.il-timer-area').fadeOut();
    $('.iw-h1').html('The <strong>Imposter</strong> wins.');
    $('.iw-h2').text(gameState.players[imp] + " chose the correct scenario.");
    $('.imposter-game-view').fadeOut(() => {
      $('.imposter-win-view').fadeIn();
    });
  });

  socket.on('setupPh4', (data) => {
    gameState = data.gameState;
    for(var p in gameState.roles) {
      player = gameState.roles[p];
      if(player == "Imposter") {
        var imp = p;
      }
    }
    if(!imp) {
      console.log("Error in setupPh4: unable to find imposter");
    }
    $('.il-timer-area').fadeOut();
    $('.iw-h1').html('<strong>Bystanders</strong> win.');
    $('.iw-h2').text(gameState.players[imp] + " done fucked up.");
    $('.imposter-game-view').fadeOut(function() {
      $('.imposter-win-view').fadeIn();
    });
  });

  socket.on('restartGame', (data) => {
    isImposter = false;
    gameState = data.gameState;
    if($('.imposter-game-view').is(':visible')) {
      $('.imposter-game-view').fadeOut();
    }
    if($('.timeout-view').is(':visible')) {
      $('.timeout-view').fadeOut();
    }
    if($('.imposter-win-view').is(':visible')) {
      $('.imposter-win-view').fadeOut();
    }
    if($('.imposter-game-btns').is(':visible')) {
      $('.imposter-game-btns').fadeOut();
    }
    if($('.imposter-list-area').is(':visible')) {
      $('.imposter-list-area').fadeOut();
    }
    if($('.votebox').is(':visible')) {
      $('.votebox').fadeOut(() => {
        $('.votebox').remove();
      });
    }
    $('.imposter-lobby-gcp, .il-timer-area, .imposter-lobby-btns, .imposter-waiting').fadeIn();
  });

  socket.on('replayGame', (data) => {
    isImposter = false;
    gameState = data.gameState;
    if($('.timeout-view').is(':visible')) {
      $('.timeout-view').fadeOut();
    }
    if($('.imposter-win-view').is(':visible')) {
      $('.imposter-win-view').fadeOut();
    }
    if($('.votebox').is(':visible')) {
      $('.votebox').fadeOut(function() {
        $('.votebox').remove();
      });
    }
    $('.imposter-scenario-list').empty();
    $('.imposter-game-view, .il-timer-area, .imposter-game-btns').fadeIn();
  });

  //Votes
  socket.on('replayVote', (data) => {
    gameState = data.gameState;
    var replaytxt = $('<h4 class="replay-vote-txt centertext"></h4>')
    .text(gameState.players[gameState.votes.replay.callerslot] + ' wants a new scenario');
    var replaytimer = $('<h5 class="replay-timer centertext"></h5>').text(gameState.votes['replay'].time);
    if(gameState.playerct < 3) {
      var threshold = 2;
    } else {
      var threshold = Math.ceil(gameState.playerct / 2);
    }
    var replayamt = $('<h5 class="replay-amount centertext"></h5>').text('1 / ' + threshold + ' votes');
    var replaybtn = $('<button class="btn btn-lg btn-block replay-agree"></button>').on('click', function() {
      socket.emit('voteForReplay', {
        slot: playerSlot
      });
    }).text('Agree').css({
      "width": "80%",
      "margin": "auto"
    });
    var replaydiv = $('<div class="replay-vote votebox" id="replay-vote"></div>').css({
      "height": "12em",
      "width": "75%",
      "margin": "auto",
      "border-style": "double",
      "border-width": "thick",
      "margin-bottom": "1em",
      "display": "none"
    }).append(replaytxt).append(replaytimer).append(replayamt).append(replaybtn);
    $('.imposter-voting-area').append(replaydiv);
    replaydiv.fadeIn();
  });

  socket.on('restartVote', (data) => {
    gameState = data.gameState;
    var restarttxt = $('<h4 class="restart-vote-txt centertext"></h4>')
    .text(gameState.players[gameState.votes.restart.callerslot] + ' wants to return to lobby');
    var restarttimer = $('<h5 class="restart-timer centertext"></h5>').text(gameState.votes['restart'].time);
    var restartamt = $('<h5 class="restart-amount centertext"></h5>').text('1 / ' + Math.ceil(gameState.playerct / 2) + ' votes');
    var restartbtn = $('<button class="btn btn-lg btn-block restart-agree"></button>').on('click', function() {
      socket.emit('voteForRestart', {
        slot: playerSlot
      });
    }).text('Agree').css({
      "width": "80%",
      "margin": "auto"
    });
    var restartdiv = $('<div class="restart-vote votebox" id="restart-vote"></div>').css({
      "height": "12em",
      "width": "75%",
      "margin": "auto",
      "border-style": "double",
      "border-width": "thick",
      "margin-bottom": "1em",
      "display": "none"
    }).append(restarttxt).append(restarttimer).append(restartamt).append(restartbtn);
    $('.imposter-voting-area').append(restartdiv);
    restartdiv.fadeIn();
  });

  socket.on('updateVotes', (data) => {
    gameState = data.gameState;
    if(gameState.votes.replay) {
      $('.replay-amount').text(gameState.votes.replay.agree + " / " + Math.round(gameState.playerct / 2) + " votes");
    }
    if(gameState.votes.restart) {
     $('.restart-amount').text(gameState.votes.restart.agree + " / " + Math.round(gameState.playerct / 2) + " votes");
   }
 });

  //Ticks
  socket.on('tickPh0', (data) => {
    gameState = data.gameState;
    $('.il-timer').text(data.gameState.timers[0]);
  });

  socket.on('tickPh1', (data) => {
    gameState = data.gameState;
    $('.il-timer').text(data.gameState.timers[1]);
  });

  socket.on('voteTick', (data) => {
    gameState = data.gameState;
    if(gameState.votes['replay']) {
      if(gameState.votes['replay'].time < 0) {
        $('.replay-vote').fadeOut(() => {
          $('.replay-vote').remove();
        });
      } else {
        $('.replay-timer').text(gameState.votes['replay'].time);
      }
      $('.replay-amount').text(gameState.votes['replay'].agree + ' / ' + Math.round(gameState.playerct / 2) + ' votes');
    }
    if(gameState.votes['restart']) {
      if(gameState.votes['restart'].time < 0) {
        $('.restart-vote').fadeOut(() => {
          $('.restart-vote').remove();
        });
      } else {
        $('.restart-timer').text(gameState.votes['restart'].time);
      }
      $('.restart-amount').text(gameState.votes['restart'].agree + ' / ' + Math.round(gameState.playerct / 2) + ' votes');
    }
  });

  //Misc
  socket.on('tooManyPostpones', (data) => {
    alert("Whoa there, cowboy.  The show must go on.");
  });

  socket.on('notEnoughPlayers', (data) => {
    return;
  });

  function startWaitingEllipsisAnimation() {
    waitingEllipsisAnimation = setInterval(() => {
      $('#waiting-dot1, #waiting-dot2, #waiting-dot3').each((i) => {
        $(this).delay(i * 200).animate({
          'bottom': '+=20px'
        }, 100, 'swing', () => {
          $(this).stop().animate({
            'bottom': '-=20px'
          });
        });
      });
    }, 1000);
  }
});