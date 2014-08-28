// ==UserScript==
// @name           Cinematik Enhancer
// @namespace      surrealmoviez.info
// @description    Display changes for Cinematik
// @updateURL      https://raw.githubusercontent.com/surrealcode/smz-userscripts/master/cinematik/cinematik.user.js
// @downloadURL    https://raw.githubusercontent.com/surrealcode/smz-userscripts/master/cinematik/cinematik.user.js
// @include        http://cinematik.net/details.php?id=*
// @require        http://code.jquery.com/jquery-1.11.1.min.js
// @grant          none
// @version        0.0.1
// ==/UserScript==

// List the IMDb ID(s) found in the description as a linked list in a dedicated row
var imdbInfoRow = $('.outer .rowhead:contains("IMDB info")').parent();
var description = $('.outer .heading:contains("Description")').next('td').html();
var pattern = /(tt\d+)/gi;
var found = description.match(pattern);
var imdbIdRowContent = 'Nothing found in the description';
var s = '';

if (found.length > 0) {
    var uniqueIds = [];
    $.each(found, function(i, el) {
        if ($.inArray(el, uniqueIds) === -1)
            uniqueIds.push(el);
    });
    if (uniqueIds.length > 1) {
        s = 's';
    }
    var imdbIdRowContent = "";
    for (var i = 0; i < uniqueIds.length; i++) {
        imdbIdRowContent += '<a href="http://anonym.to/?http://www.imdb.com/title/' + uniqueIds[i] + '/" target="_blank">' + uniqueIds[i] + '</a> ';
    }
}

var imdbIdRow = '<tr><td valign="top" align="right" class="heading">IMDb ID' + s + '</td><td valign="top" align="left">' + imdbIdRowContent + '</td></tr>';
$(imdbIdRow).insertBefore(imdbInfoRow);