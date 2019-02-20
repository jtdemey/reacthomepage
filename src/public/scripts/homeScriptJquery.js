let submitContactForm = undefined;
$(document).ready(function() {
    const projectTitles = ["TuneWeaver", "GameSuite", "Survive"];
    const projectDescs = ["A recurrent neural network that uses LSTMs to produce musical accompaniments for your melody.",
    "A collection of mobile games to play with friends.",
    "A text-based adventure of horror, strategy, and survival. You are stranded in the freezing woods at night near an abandoned mansion, but you are not alone. How long will you last?"];
    const projectLinks = ["https://github.com/jtdemey/TuneWeaver", "/gamesuite", "/survive"];
    let viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    let viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    let mobileview = false;
    let navcd = null;
    let hlcd = null;
    let tabview = 999;
    let contentHeight = $('.content-view').height();
    let tunes = {};
    let tunePlaying = 0;
    let tunePoll = undefined;
    //var pbWidth = $('.proj-browser').width();
    //var pbSelectedTab = 0;
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
        mobileview = true;
    }
    checkDimensions(viewportWidth, viewportHeight);
    $(window).resize(function() {
        checkDimensions(viewportWidth, viewportHeight);
    });
    scrollCheck();
    $(window).scroll(scrollCheck);
    loadTunes();
    $('.nav-area').on('mouseenter', function() {
        if(navcd != null) {
            clearTimeout(navcd);
            navcd = null;
        }
        /**if(mobileview == false) {
            $('.home-title').css({"border": "0px solid #cccccc", "border-style": "double", "margin-top": "2.25em"}).stop().animate({
                borderWidth: 4, color: "#e6e6e6"
            }, 100);
            $('.proj-title').css({"border": "0px solid #16222A", "border-style": "double", "margin-top": "2.25em"}).stop().animate({
                borderWidth: 4, color: "#669ab2"
            }, 200);
            $('.tunes-title').css({"border": "0px solid #8E0E00", "border-style": "double", "margin-top": "2.25em"}).stop().animate({
                borderWidth: 4, color: "#cc1400"
            }, 300);
            $('.contact-title').css({"border": "0px solid #56ab2f", "border-style": "double", "margin-top": "2.25em"}).stop().animate({
                borderWidth: 4, color: "#a8e063"
            }, 400);
        }**/
    });
    $('.nav-area').on('mouseleave', function() {
        if(mobileview == false) {
            navcd = setTimeout(function() {
                $('.navlist li h5').stop().animate({color: "white", borderWidth: 0}, 500);
            }, 600);
        }
    });
    $('.navlist li').on('mouseenter', function() {
        if($(this).queue().length > 2) {
            $('.navlist li, .nav-title').stop().clearQueue();
        }
        if(hlcd != null) {
            clearTimeout(hlcd);
        }
        $(this).animate({backgroundColor: "#404040"}, 300);
    });
    $('.ni-home').on('mouseenter', function() {
        refreshNavColors();
        if(mobileview == false) {
            $('.home-highlight').stop().animate({left: "0px"}, 400);
        }
        $('.home-title').stop().animate({color: "white"}, 300);
    });
    $('.ni-projects').on('mouseenter', function() {
        refreshNavColors();
        $(this).stop().animate({backgroundColor: "#16222A"}, 300);
        if(mobileview == false) {
            $('.proj-highlight').stop().animate({left: "0px"}, 400);
        }
        $('.proj-title').stop().animate({color: "white"}, 300);
    });
    $('.ni-tunes').on('mouseenter', function() {
        refreshNavColors();
        $(this).animate({backgroundColor: "#660a00"}, 300);
        if(mobileview == false) {
            $('.tunes-highlight').stop().animate({left: "0px"}, 400);
        }
        $('.tunes-title').stop().animate({color: "white"}, 300);
    });
    $('.ni-contact').on('mouseenter', function() {
        refreshNavColors();
        $(this).animate({backgroundColor: "#285016"}, 300);
        if(mobileview == false) {
            $('.contact-highlight').stop().animate({left: "0px"}, 400);
        }
        $('.contact-title').stop().animate({color: "white"}, 300);
    });
    $('.navlist li').on('mouseleave', function() {
        $(this).animate({backgroundColor: "#4d4d4d"}, 300);
        $('.nav-highlight').stop().animate({left: "-100px"}, 200);
    });
    $('a[href^="\\#"]').on('click', function() {
        var anchor = "0px";
        var contenth = parseFloat($('.home-content').css("height"));
        var mult = parseInt($(this).attr("href").substring(4, 5), 10);
        if(mult == 1) {
            anchor = (mult * contenth + 98) + "px";
        } else if(mult > 1) {
            anchor = ((mult - 1) * contenth + 1598) + "px";
        }
        $('html, body, .content').stop().animate({scrollTop: anchor}, 500);
    });
    $('.tile').on('mouseenter', function() {
        $(this).css({'border': '1px solid #d9d9d9', 'border-radius': '1em'}).stop().animate({borderWidth: 4});
    }).on('mouseleave', function() {
        $(this).css({'border': '4px solid #bfbfbf'}).stop().animate({borderWidth: 1});
    });
    /**$('.pb-tab').css({'width': pbWidth / projectTitles.length});
    $('.pb-tab' + pbSelectedTab).css("background-color", "#bfbfbf");
    $('.pb-tab').on('mouseenter', function() {
        $(this).stop().animate({backgroundColor: "#bfbfbf"}, 500);
    }).on('mouseleave', function() {
        if(!$(this).hasClass('pb-tab' + pbSelectedTab)) {
            $(this).stop().animate({backgroundColor: "#595959"}, 500);
        }
    }).on('click', function() {
        $('.pb-tab' + pbSelectedTab).stop().animate({backgroundColor: "#595959"}, 500);
        pbSelectedTab = $(this).attr('id').charAt($(this).attr('id').length - 1) - 1;
        nextPBDisplay();
        clearInterval(pbAlternator);
        pbAlternator = setInterval(nextPBDisplay, 8000);
    });
    $('.pb-btn').on('mouseenter', function() {
        $('.pb-btn-word').stop().animate({
            backgroundColor: "#333333",
            color: "white"
        }, 400);
        $(this).stop().animate({borderColor: "#262626"});
    }).on('mouseleave', function() {
        $('.pb-btn-word').stop().animate({
            backgroundColor: "white",
            color: "black"
        });
        $(this).stop().animate({borderColor: "white"});
    });**/
    $('.proj-window').on('mouseenter', function() {
        let windclasses = $(this).attr('class').split(/\s+/);
        let targheader = '.tw-header';
        if(windclasses.includes('gs-window')) {
            targheader = 'gs-header';
        } else if(windclasses.includes('s-window')) {
            targheader = '.s-header';
        }
        $('#tw-header').stop().css({
            '-webkit-transition': 'bottom 0.3s ease-out 0s'
        });
    });
    $('.pw-btn').on('mouseenter', function() {
        let btnclasses = $(this).attr('class').split(/\s+/);
        let btncol = 'green';
        if(btnclasses.includes('gs-btn')) {
            btncol = '#006699';
        } else if(btnclasses.includes('s-btn')) {
            btncol = '#660000';
        }
        $(this).children().stop().animate({ 'color': btncol }, 200);
    }).on('mouseleave', function() {
        $(this).children().stop().animate({ 'color': 'black' }, 200);
    });
    $('.tune-list li').on('mouseenter', function() {
        var tid = $(this).attr('class').charAt($(this).attr('class').length - 1);
        if(tid != tunePlaying) {
            $(this).stop().animate({ backgroundColor: '#737373' });
        }
    }).on('mouseleave', function() {
        var tid = $(this).attr('class').charAt($(this).attr('class').length - 1);
        if(tid != tunePlaying) {
            $(this).stop().animate({ backgroundColor: 'transparent' });
        }
    }).on('mousedown', function() {
        var tcl = $(this).attr('class');
        var tid = tcl.charAt(tcl.length - 1);
        if(tid == tunePlaying) {
            stopTune(tid);
        } else if(tunePlaying != 0) {
            stopTune(tunePlaying);
            playTune(tid);
        } else {
            playTune(tid);
        }
    });
    function refreshNavColors() {
        $('.home-title').animate({color: "#e6e6e6"}, 200);
        $('.proj-title').animate({color: "#669ab2"}, 200);
        $('.tunes-title').animate({color: "#cc1400"}, 200);
        $('.contact-title').animate({color: "#a8e063"}, 200);
    }
    function updateSelectedTab(tv) {
        tabview = tv;
        if(tabview == 0) {
            $('.section-tab').animate({
                backgroundColor: '#a6a6a6',
                top: '0px'
            });
        } else if(tabview == 1) {
            $('.section-tab').animate({
                backgroundColor: '#006bb3',
                top: '86px'
            });
        } else if(tabview == 2) {
            $('.section-tab').animate({
                backgroundColor: '#8E0E00',
                top: '172px'
            });
        } else if(tabview == 3) {
            $('.section-tab').animate({
                backgroundColor: '#56ab2f',
                top: '258px'
            });
        }
    }
    function checkDimensions(w, h) {
        viewportWidth = parseInt(Math.max(document.documentElement.clientWidth, window.innerWidth || 0));
        viewportHeight = parseInt(Math.max(document.documentElement.clientHeight, window.innerHeight || 0));
        if(viewportWidth / viewportHeight < 1.0) {
            mobileview = true;
            $('.nav-area, .navlist').css({
                'width': window.screen.availWidth + 'px',
                'height': '54px',
                'overflow': 'auto'
            });
            $('.navlist').css({
                'overflow': 'auto'
            });
            $('.nav-link, .navlist li, .nav-title').css({
                'width': (viewportWidth / 4) + 'px',
                'height': '54px'
            });
            $('.navlist li h5').css({
                'height': 'auto',
                'margin-top': '0',
                'margin-bottom': '0',
                'margin-right': '0',
                'padding-top': '1.25em'
            });
            $('.nav-highlight').hide();
            $('.section-tab').hide();
            $('.proj-browser').hide();
            $('.pw-header').css('font-size', '2.5em');
            $('.pw-body p').css('font-size', '1.2em');
            $('html, body').css('width', '100%');
            $('.content-area, .content, .content-view').css({'margin-left': '0', 'width': '100%'});
            $('.jd-title').css('margin-left', '0.25em');
            $('.tile').css('margin-bottom', '1em');
        } else {
            mobileview = false;
            $('.nav-area, .navlist').css({
                'width': '86px',
                'height': '100%',
                'overflow': 'hidden'
            });
            $('.nav-link, .navlist li').css({
                'width': '86px',
                'height': '86px',
                'float': 'left'
            });
            $('.navlist li h5').css({
                //'margin-top': '2.5em',
                'margin-right': '0.32em',
                'padding': '0'
            });
            $('.nav-highlight').show();
            $('.section-tab').show();
            $('.content-area').css('margin-left', '86px');
            $('.jd-title').css('margin-left', '0.75em');
            $('.tile').css('margin-bottom', '0');
        }
    }
    function scrollCheck() {
        if($(window).scrollTop() > 98) {
            $('.nav-area').addClass('nav-fixed');
        } else {
            $('.nav-area').removeClass('nav-fixed');
        }
        if($(this).scrollTop() < contentHeight && tabview != 0) {
            updateSelectedTab(0);
        } else if($(this).scrollTop() > contentHeight && $(this).scrollTop() < (contentHeight + 1300) && tabview != 1) {
            updateSelectedTab(1);
        } else if($(this).scrollTop() > (contentHeight + 1300) && $(this).scrollTop() < (contentHeight * 2 + 1300) && tabview != 2) {
            updateSelectedTab(2);
        } else if($(this).scrollTop() > (contentHeight * 2 + 1300) && tabview != 3) {
            updateSelectedTab(3);
        }
    }
    function nextPBDisplay() {
        $('.pb-fade').fadeOut(800).promise().then(function() {
            $('.pb-tab' + pbSelectedTab).stop().animate({backgroundColor: "#595959"}, 700);
            if(pbSelectedTab < 2) {
                pbSelectedTab += 1;
            } else {
                pbSelectedTab = 0;
            }
            $('.pb-view').css("background", "url(/media/pb" + pbSelectedTab + ".png)");
            $('.pb-header').text(projectTitles[pbSelectedTab]);
            $('.pb-desc').html(projectDescs[pbSelectedTab]);
            $('.pb-btn-link').attr('href', projectLinks[pbSelectedTab]);
            if(pbSelectedTab > 0) {
                $('.pb-btn-word').html("<strong>PLAY</strong>");
            } else {
                $('.pb-btn-word').html("<strong>INFO</strong>");
            }
            $('.pb-tab' + pbSelectedTab).stop().animate({backgroundColor: "#bfbfbf"}, 700);
            $('.pb-fade').fadeIn();
        });
    }
    function loadTunes() {
        for(var i = 1; i < 7; i++) {
            loadTune(i);
        }
    }
    function loadTune(tuneid) {
        var tune = document.createElement('audio');
        var src = document.createElement('source');
        var tunename = 'tune' + tuneid;
        tune.preload = 'auto';
        switch(tuneid) {
            case 1: src.src = '/media/tune_tcu_instr.mp3';
                break;
            case 2: src.src = '/media/tune_snowfall.mp3';
                break;
            case 3: src.src = '/media/viralOST.mp3';
                break;
            case 4: src.src = '/media/tune_9.mp3';
                break;
            case 5: src.src = '/media/tune_jam1.mp3';
                break;
            case 6: src.src = '/media/tune_13v2.mp3';
                break;
            default:
                break;
        }
        tune.appendChild(src);
        tune.volume = 0.8;
        tune.addEventListener('ended', function() {
            stopTune(tuneid);
        });
        tunes[tunename] = tune;
    }
    function playTune(tuneid) {
        setTimeout(function() {
            tunes['tune' + tuneid].load();
            tunes['tune' + tuneid].play();
            tunePlaying = tuneid;
        }, 10);
        $('#playbtn' + tuneid).attr('src', '/media/stopbtn.svg');
        $('.tune' + tuneid).stop().animate({ backgroundColor: '#999999' });
    }
    function stopTune(tuneid) {
        tunes['tune' + tuneid].pause();
        tunes['tune' + tuneid].currentTime = 0;
        $('#playbtn' + tuneid).attr('src', '/media/playbtn.svg');
        $('.tune' + tuneid).stop().animate({ backgroundColor: 'transparent' });
        tunePlaying = 0;
    }
    //var pbAlternator = setInterval(nextPBDisplay, 8000);
    /*function enableGradientAnims(divname) {
        var gradstr = "Gradient 15ms ease infinite";
        $(divname).css({
            "background": "linear-gradient(black, blue, red, pink, orange)",
            "-webkit-animation": gradstr,
            "-moz-animation": gradstr,
            "animation": gradstr
        });
    }*/
    /*$('.home-content').on('click', function() {
        enableGradientAnims('.home-content');
    });*/
    submitContactForm = function() {
        var contactName = $('#contact-name').val();
        var contactText = $('#contact-text').val();
        console.log(window.location);
        var requestUrl = window.location.origin + '/scripts/contact';
        console.log(requestUrl);
        var pl = {
            'contactname': contactName,
            'contacttext': contactText
        };
        $.ajax({
            type: 'POST',
            url: requestUrl,
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
                    console.log('Error in submitting contact form.');
                    notificationBox('error', 5000, 'Error in submitting contact form.');
                    return;
                }
                if(data.reqstatus == 'accepted') {
                    console.log('Contact request submitted!');
                    notificationBox('success', 5000, 'Contact request submitted!');
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
        $('#contact-name').val('');
        $('#contact-text').val('');
    }
    //notificationBox('notify', 10000, 'this is a simple test. this is a simple test. this is a simple test. this is a simple test. this is a simple test. this is a simple test.');
    function notificationBox(type, duration, text) {
      console.log('making notification box');
      let mainColor = '#2fb62f';
      let auxColor = '#2aa22a';
      let symbolSrc = '/media/checkmark.svg';
      switch(type) {
        case 'error':
          mainColor = '#b30000';
          auxColor = '#990000';
          break;
        case 'notify':
          mainColor = '#006699';
          auxColor = '#0088cc';
          break;
        default:
          break;
      }
      let notifyBox = $('<div class="notification-box"></div>').css({
        position: 'fixed',
        display: 'flex',
        top: '20px',
        right: '-50%',
        marginLeft: '-240px',
        width: '460px',
        height:'70px',
        color: 'white',
        background: auxColor,
        border: '1px solid ' + mainColor,
        borderRadius: '10px',
        'box-shadow': '4px 2px 11px #1a1a1a'
      }).appendTo('body');
      let notifyTextArea = $('<div class="notification-text-area"></div>').css({
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        width: '100%'
      }).appendTo(notifyBox);
      let notifyText = $('<div class="notification-text">' + text + '</div>').css({
        width: '100%',
        paddingLeft: '10px',
        paddingRight: '10px',
        'font-family': 'Arial',
        'font-size': '0.8em'
      }).appendTo(notifyTextArea);
      setTimeout(function() {
        $('.notification-box').animate({
          right: '+=55%'
        }, 400, function() {
          setTimeout(function() {
            $('.notification-box').animate({
              top: '-=120px'
            }, 400, function() {
              $('.notification-box').remove();
            });
          }, duration);
        });
      }, 100);
    }
});