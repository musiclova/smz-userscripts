// ==UserScript==
// @name           Gormogon Enhancer
// @namespace      surrealmoviez.info
// @description    Better display for Gormogon
// @updateURL      https://raw.githubusercontent.com/surrealcode/smz-userscripts/master/gormogon/gormogon.user.js
// @downloadURL    https://raw.githubusercontent.com/surrealcode/smz-userscripts/master/gormogon/gormogon.user.js
// @include        http://www.gormogon.com/*
// @require        http://code.jquery.com/jquery-1.11.1.min.js
// @grant          none
// @version        0.1.3
// ==/UserScript==

// Link the page logo to the index
$('.tracker_logo').wrap('<a href="index.php"></a>');
// Properly center the site logo (OCD, you know...)
$('#logo > table').attr('width', 'auto');
$('#logo .tracker_logo').css('width', '675px');

// If present, modify the main menu
if ($('#menu').length === 1) {
    // Remove the user bar toggler
    $('#slideIt img[alt=click]').parents('span').hide();
    // Shrink unnecessary empty spaces
    $('#menu').css('height', '40px');
    // Add a link to 'All torrents' to 'Torrents Menu' and the 'Torrents' submenu
    $('#menu .level2 .fly:contains("Torrents")').attr('href', 'http://www.gormogon.com/index.php?page=torrents&search=&category=0&active=0');
    $('.level1-li .level1-a:contains("Torrent Menu")').attr('href', 'http://www.gormogon.com/index.php?page=torrents&search=&category=0&active=0');
    // Rename the 'User Menu' panel
    $('.level1-li .level1-a:contains("User Menu")').text('Community');
    // Place 'My Panel' as a top level menu
    var uid = $('ul.level2 a:contains("CP Home")').attr('href');
    $('.fly:contains("My Panel")').parent().remove();
    uid = uid.substring(uid.indexOf('uid=') + 4);
    var myPanelMenu = '<li class="level1-li"><a href="index.php?page=usercp&amp;uid=' + uid + '" class="level1-a drop">My panel</a>'
            + '<!--[if gte IE 7]><!--><!--<![endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->'
            + '<ul class="level2">'
            + '<li><a href="index.php?page=usercp&amp;uid=' + uid + '">My profile</a></li>'
            + '<li><a href="index.php?page=usercp&amp;uid=' + uid + '&amp;do=pm&amp;action=list&amp;what=inbox" class="fly">My PMs</a>'
            + '<!--[if gte IE 7]><!--><!--<![endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->'
            + '<ul class="level3">'
            + '<li><a href="index.php?page=usercp&amp;uid=' + uid + '&amp;do=pm&amp;action=list&amp;what=inbox">Inbox</a></li>'
            + '<li><a href="index.php?page=usercp&amp;uid=' + uid + '&amp;do=pm&amp;action=list&amp;what=outbox">Outbox</a></li>'
            + '<li><a href="index.php?page=usercp&amp;uid=' + uid + '&amp;do=pm&amp;action=edit&amp;uid=' + uid + '&amp;what=new">Write new</a></li>'
            + '</ul><!--[if lte IE 6]></td></tr></table></a><![endif]--></li>'
            + '<li><a href="index.php?page=usercp&amp;do=user&amp;action=change&amp;uid=' + uid + '" class="fly">Edit Profile</a>'
            + '<!--[if gte IE 7]><!--><!--<![endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->'
            + '<ul class="level3">'
            + '<li><a href="index.php?page=usercp&amp;do=user&amp;action=change&amp;uid=' + uid + '">General</a></li>'
            + '<li><a href="index.php?page=usercp&amp;do=pwd&amp;action=change&amp;uid=' + uid + '">Password</a></li>'
            + '<li><a href="index.php?page=usercp&amp;do=pid_c&amp;action=change&amp;uid=' + uid + '">Change PID</a></li>'
            + '</ul><!--[if lte IE 6]></td></tr></table></a><![endif]--></li>'
            + '</ul><!--[if lte IE 6]></td></tr></table></a><![endif]--></li>';
    $('#menu > ul.level1').append(myPanelMenu);
}

// Remove the clock
var clock = $('.block-head-title:contains("Clock")').parents('.block');
clock.prev('br').remove();
clock.remove();
// Remove lottery (always closed)
$('.block-head-title:contains("Lottery")').parents('.block').remove();

// Remove duplicated elements from iframes
if (window.self !== window.top) {
    $('#logo').remove();
}

// Display the IMDb ID in each article
if (document.documentURI.indexOf("page=torrent-details") !== -1) {
    var imdbRow = '<tr><td align="right" class="header">IMDb ID</td><td id="imdbRow" valign="top" align="center" style="text-align:left;" class="lista">No IMDb found</td></tr>';
    $(imdbRow).insertAfter('.b-content > div table tr:eq(2)');

    var iframeImdb = $('#online_ifrm');
    if (iframeImdb.length === 1) {
        // Search for an IMDb ID in the foreseen section
        var imdbId = iframeImdb.attr('src');
        imdbId = 'tt' + imdbId.substring(imdbId.indexOf('=') + 1);
        $('#imdbRow').html('<a href="http://anonym.to/?http://www.imdb.com/title/' + imdbId + '/" target="_blank">' + imdbId + '</a>');
    } else {
        // Search for IMDb IDs in the description
        var description = $('.b-content > div table tr:eq(8) td:eq(1)').html();
        var pattern = /(tt\d+)/i;
        var found = description.match(pattern);

        if (found.length > 0) {
            var uniqueIds = [];
            $.each(found, function(i, el) {
                if ($.inArray(el, uniqueIds) === -1)
                    uniqueIds.push(el);
            });
            var stringLinksImdb = "";
            for (var i = 0; i < uniqueIds.length; i++) {
                stringLinksImdb += '<a href="http://anonym.to/?http://www.imdb.com/title/' + uniqueIds[i] + '/" target="_blank">' + uniqueIds[i] + '</a> ';
            }
            $('#imdbRow').html(stringLinksImdb + '(guessed from the description content)');
        }
    }
}

// Add a global search bar
if (window.self === window.top && document.documentURI.indexOf("page=torrents") === -1) {
    var placeholder;
    if (document.documentURI.indexOf("/smf/") === -1) {
        placeholder = $('#slideIt img[alt=click]').parents('span');
        $('#menu li').css('z-index', '100');
    } else {
        placeholder = $('#logo');
        $('#logo').css('margin-bottom', '3px');
        $('#logo').next('table').css('margin-top', '3px');
    }
    var searchDiv = '<form id="searchBar" action="index.php" style="margin-left: 8px; margin-right: 12px; text-align: center;">'
            + '<input type="text" name="search" style="width: 85%; height: 20px; border: 1px solid rgb(51, 51, 51); background-color: rgb(25, 25, 25); color: white; border-radius: 3px; margin-right: 3px; padding-left: 4px; padding-right: 4px;" placeholder="Search torrents" name="search" maxlength="250" value="">'
            + '<select size="1" name="options" style="width: auto; height: 20px; border: 1px solid rgb(51, 51, 51); background-color: rgb(25, 25, 25); color: grey; border-radius: 3px;">'
            + '<option selected="selected" value="0">File name</option>'
            + '<option value="2">Description</option>'
            + '<option value="1">Both</option>'
            + '</select>'
            + '<input type="hidden" name="page" value="torrents">'
            + '<input type="hidden" name="category" value="0">'
            + '<input type="hidden" name="options"  value="0">'
            + '<input type="hidden" name="active"  value="0">'
            + '</form>';
    $(searchDiv).insertAfter(placeholder);
}