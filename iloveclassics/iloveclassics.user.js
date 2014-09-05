// ==UserScript==
// @name           ILoveClassics Enhancer
// @namespace      surrealmoviez.info
// @description    Better display for ILoveClassics
// @updateURL      https://github.com/surrealcode/smz-userscripts/raw/master/iloveclassics/iloveclassics.user.js
// @downloadURL    https://github.com/surrealcode/smz-userscripts/raw/master/iloveclassics/iloveclassics.user.js
// @include        http://www.iloveclassics.com/*
// @require        http://code.jquery.com/jquery-1.11.1.min.js
// @grant          none
// @version        0.0.1
// ==/UserScript==

// Add a global search bar
var userbarTitle = $('.NB_ftcm:contains(User Bar)').parents('.fheader');
var searchDiv = '<form action="browse.php" method="get" style="margin-top: 2px; margin-bottom: 4px; width: 100%;">'
        + '<input type="text" name="search" style="width: 85%; border: 1px solid rgb(51, 51, 51); background-color: rgb(25, 25, 25); color: white; border-radius: 3px; margin-right: 3px; padding-left: 4px; padding-right: 4px;" placeholder="Search torrents" maxlength="250" value="">'
        + '<input type="hidden" value="0" name="cat">'
        + '<input type="hidden" value="1" name="incldead">'
        + '<select name="searchin" style="width: 14%; text-align: center; right: 0px; background-color: rgb(25, 25, 25); color: white; border: 1px solid rgb(51, 51, 51); border-radius: 3px;">'
        + '<option value="1" style="color: gray;">Title</option>'
        + '<option value="2">Description</option>'
        + '<option value="0">Both</option>'
        + '</select>'
        + '</form>';
$(searchDiv).insertAfter(userbarTitle);
userbarTitle.hide();

// Site logo links to the homepage
$('.clear > div > img').wrap('<a href="index.php"></a>');

// Reorder the search display to get to the actual data faster
if (document.documentURI.indexOf('/browse.php') !== -1) {
    // Put the colour keys at the bottom of the list
    var colourKeys = $('.NB_fmmain > center');
    colourKeys.siblings('br').remove();
    $(colourKeys).insertAfter('#hover-over');
    
    // Flip the search methods
    $('#kutorrentsearch > center').prependTo('#kutorrentsearch');
    $('#kutorrentsearch > form').appendTo('#kutorrentsearch');
    $('#kutorrentsearch > br').remove();
}