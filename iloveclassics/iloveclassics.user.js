// ==UserScript==
// @name           ILoveClassics Enhancer
// @namespace      surrealmoviez.info
// @description    Better display for ILoveClassics
// @updateURL      https://github.com/surrealcode/smz-userscripts/raw/master/iloveclassics/iloveclassics.user.js
// @downloadURL    https://github.com/surrealcode/smz-userscripts/raw/master/iloveclassics/iloveclassics.user.js
// @include        http://www.iloveclassics.com/*
// @require        http://code.jquery.com/jquery-1.11.1.min.js
// @grant          none
// @version        0.1.4
// ==/UserScript==

var uri = document.documentURI;

// Add a global search bar
var userbarTitle = $('.NB_ftcm:contains(User Bar)').closest('.fheader');
var searchDiv = '<table width="100%" cellspacing="0" cellpadding="0" border="0" style="text-align: center;"><tr><td>'
        + '<form id="globalSearchBar" action="http://www.iloveclassics.com/browse.php" method="get" style="margin-top: 2px; margin-bottom: 4px; width: 100%;">'
        + '<input type="text" name="search" style="width: 85%; border: 1px solid rgb(51, 51, 51); background-color: rgb(25, 25, 25); color: white; border-radius: 3px; margin-right: 3px; padding-left: 4px; padding-right: 4px;" placeholder="Search torrents" maxlength="250" value="">'
        + '<input type="hidden" value="0" name="cat">'
        + '<input type="hidden" value="1" name="incldead">'
        + '<select name="searchin" style="width: 14%; text-align: center; right: 0px; background-color: rgb(25, 25, 25); color: white; border: 1px solid rgb(51, 51, 51); border-radius: 3px;">'
        + '<option value="1" style="color: gray;">Title</option>'
        + '<option value="2">Description</option>'
        + '<option value="0">Both</option>'
        + '</select>'
        + '</form>'
        + '</td></tr></table>';
$(searchDiv).insertAfter(userbarTitle);
// Open search result in new tab if in the shoutbox page
if (uri.indexOf('/sb.php') !== -1) {
    $('#globalSearchBar').attr('target', '_blank');
}
userbarTitle.hide();

// Site logo links to the homepage
$('.clear > div > img').wrap('<a href="index.php"></a>');


// Reorder the search display to get to the actual data faster
if (uri.indexOf('/browse.php') !== -1) {
// Put the colour keys at the bottom of the list
    var colourKeys = $('.NB_fmmain > center');
    colourKeys.siblings('br').remove();
    $(colourKeys).insertAfter('#hover-over');
    
    // Flip the search methods
    $('#kutorrentsearch > center').prependTo('#kutorrentsearch');
    $('#kutorrentsearch > form').appendTo('#kutorrentsearch');
    $('#kutorrentsearch > br').remove();
}

// Remove the search area if the user is browsing torrent pages
if (uri.indexOf('/browse.php?') !== -1 && uri.indexOf('page=') !== -1 && uri.indexOf('page=0') === -1) {
    klappe_news('utorrentsearch');
    $('body').scrollTop($('#picutorrentsearch').closest('.ftable').offset().top);
}