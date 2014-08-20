// ==UserScript==
// @name           Gormogon Enhancer
// @namespace      surrealmoviez.info
// @description    Better display for Gormogon
// @updateURL      
// @downloadURL    
// @include        http://www.gormogon.com/index.php?page=torrent-details&*
// @require        http://code.jquery.com/jquery-1.11.1.min.js
// @grant          none
// @version        0.0.1
// ==/UserScript==

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