// ==UserScript==
// @name           IMDb Enhancer
// @namespace      surrealmoviez.info
// @description    Better display for IMDb
// @updateURL      https://github.com/surrealcode/smz-userscripts/raw/master/imdb/imdb.user.js
// @downloadURL    https://github.com/surrealcode/smz-userscripts/raw/master/imdb/imdb.user.js
// @include        http://www.imdb.com/find?*
// @grant          none
// @version        0.0.2
// ==/UserScript==

// Insert the IMDb ID as plain text at the right side of the titles matches
var titlesBlock = $('.findSectionHeader:contains("Titles")').parent();
$('.result_text', titlesBlock).each(function() {
    var href = $('a', this).attr('href');
    var id = href.substring(href.indexOf('/tt') + 1, href.lastIndexOf('/'));
    $(this).append('<span style="float: right; margin-right: 5px; opacity: 0.4; padding: 4px;">' + id + '</span>');
});