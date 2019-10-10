var imposterNewGame = function() {};
var imposterJoinGame = function() {};
var pistolwhipNewGame = function() {};
$(document).ready(function() {
  var gameView = 0;
  var viewChangeCD = false;
  $('.lm-imposter').stop().animate({color: 'white'}, 500);
  //Menu item listeners
  $('.lm-imposter').on('mousedown tap', function() {
    refreshGameChoice(0);
  });
  $('.lm-pistolwhip').on('mousedown tap', function() {
    refreshGameChoice(1);
  });
  $('.lm-options').on('mousedown tap', function() {
    refreshGameChoice(2);
  });
  //Button listeners
  $('.mv-btn').on('mousedown tap', function() {
    $(this).css({backgroundColor: '#0073e6'});
    setTimeout(function() {
      $('.mv-btn').css({backgroundColor: '#808080'});
    }, 100);
  });
  $('.new-btn').on('mousedown tap', function() {
    let s = '.imposter-new-view';
    if(gameView == 1) {
      s = '.pistolwhip-new-view';
    }
    $('.menu-view, .mvbtn-area').fadeOut(function() {
      $(s).fadeIn(250);
    });
  });
  $('.join-btn').on('mousedown tap', function() {
    $('.menu-view, .mvbtn-area').fadeOut(function() {
      $('.imposter-join-view').fadeIn(250);
    });
  });
  $('.about-btn').on('mousedown tap', function() {
    if(gameView == 0) {
      $('#imposter-modal').modal('show');
    } else {
      $('#pistolwhip-modal').modal('show');
    }
  });
  $('.back-btn').on('mousedown tap', function() {
    $('.new-view, .join-view').fadeOut(100, function () {
      $('.menu-view, .mvbtn-area').fadeIn(250);
    });
  });
  //Form handling
  imposterNewGame = function() {
    var pName = $('#imposter-new-namebox').val();
    var pl = {
      'name': pName,
      'gametitle': 'imposter'
    };
    $.ajax({
      type: 'POST',
      url: window.location + '/scripts/makeGame',
      contentType: 'application/json',
      dataType: 'json',
      cache: false,
      data: JSON.stringify(pl),
      beforeSend: function(x) {
        if (x && x.overrideMimeType) {
          console.log('Overriding MIME type to UTF8');
          x.overrideMimeType("application/j-son;charset=UTF-8");
        }
      },
      success: function(data, status, jqreq) {
        console.log('Creating new Imposter game...');
        var newurl = window.location.toString().replace('/gamesuite/', '');
        if(data.reqstatus == 'ready') {
          newurl = newurl + '/imposter/' + data.gamecode;
          window.location.href = newurl;
        }
        return true;
      },
      error: function(jqreq, status, err) {
        console.log(err);
        alert(err);
        console.log(jqreq);
        return false;
      }
    });
  };
  imposterJoinGame = function() {
    var pName = $('#imposter-join-namebox').val();
    var pGameCode = $('#imposter-join-gcbox').val();
    var pl = {
      'name': pName,
      'gamecode': pGameCode,
      'gametitle': 'imposter'
    };
    $.ajax({
      type: 'POST',
      url: window.location + 'scripts/joinGame',
      contentType: 'application/json',
      dataType: 'json',
      cache: false,
      data: JSON.stringify(pl),
      beforeSend: function(x) {
        if (x && x.overrideMimeType) {
          console.log('Overriding MIME type to UTF8');
          x.overrideMimeType("application/j-son;charset=UTF-8");
        }
      },
      success: function(data, status, jqreq) {
        if(data.reqstatus == 'error') {
          console.log('Error in joining Imposter.');
          alert(data.error);
          return;
        }
        console.log('Joining Imposter game ' + data.gamecode + '...');
        var newurl = window.location.toString().replace('/gamesuite/', '');
        if(data.reqstatus == 'ready') {
          newurl = newurl + '/imposter/' + data.gamecode;
          window.location.href = newurl;
        }
        return true;
      },
      error: function(jqreq, status, err) {
        console.log(err);
        alert(err);
        console.log(jqreq);
        return false;
      }
    });
  };
  //View changing
  function refreshGameChoice(id) {
    if(viewChangeCD === false) {
      gameView = id;
      let n = '.lm-li' + id;
      let p = 115 + (61 * id);
      let q = p + 'px';
      let r = 'none';
      $('.lobby-menu li').stop().animate({color: '#cccccc'}, 250);
      $(n).stop().animate({color: 'white'}, 500);
      $('.lm-selector').stop().animate({top: q}, 400);
      $('.gd').hide(function() {
        setTimeout(function() {
          if(id < 2 && $('.mv-btns').css('display') == 'none') {
            $('.mv-btns').fadeIn(200);
          }
          if(id == 0) {
            $('.gd-imposter').fadeIn(300);
            if($('.join-btn').css('display') == 'none') {
              $('.join-btn').fadeIn(200);
            }
            $('.mv-btns').css({'grid-template-columns': '1fr 1fr 1fr'});
          } else if(id == 1) {
            $('.gd-pistolwhip').fadeIn(300);
            $('.join-btn').fadeOut(200);
            setTimeout(function() {
              $('.mv-btns').css({'grid-template-columns': '1fr 1fr'});
            }, 200);
          } else if(id == 2) {
            $('.gd-options').fadeIn(300);
            $('.mv-btns').fadeOut(200);
          }
        }, 100);
      });
      viewChangeCD = true;
      setTimeout(function() {
        viewChangeCD = false;
      }, 800);
    }
  }
});